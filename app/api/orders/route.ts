import OrderConfirmationEmail from "@/app/emails/order-confimation-email";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      packagetype,
      price,
      description,
      title,
      startTime,
      companyName,
      fullName,
      email,
      phoneNumber,
      extras,
    } = body;

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return new NextResponse("Invalid price format", { status: 400 });
    }

    const order = await db.order.create({
      data: {
        packagetype,
        price: parsedPrice,
        description,
        title,
        startTime,
        companyName,
        fullName,
        email,
        phoneNumber,
        extras: Array.isArray(extras) ? extras : [],
      },
    });

    const serviceDetails = {
      name: title,
      plan: packagetype,
      price: `$${parseFloat(price).toLocaleString()}`,
      features: [...extras],
    };

    let emailResponse;
    try {
      emailResponse = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: `Order Confirmation - RE:THYNKWeb Studios`,
        react: OrderConfirmationEmail({
          name: fullName,
          service: serviceDetails,
          startDate: startTime,
        }),
      });

      console.log("Email Response:", emailResponse);
    } catch (emailError) {
      console.error("[EMAIL ERROR]", emailError);
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("[ORDERS ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await db.order.findMany({
      include: {
        Milestones: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("[ORDERS ERROR]", error);
    return NextResponse.error();
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return new NextResponse("Order ID and status are required", {
        status: 400,
      });
    }

    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: { status },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("[ORDER STATUS UPDATE ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
