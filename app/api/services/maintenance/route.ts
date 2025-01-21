import OrderConfirmationEmail from "@/app/emails/order-confimation-email";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      platform,
      currentIssues,
      requiredServices,
      additionalInformation,
      updateFrequency,
      supportLevel,
      price,
      selectedPlan,
      monthlyTraffic,
      fullName,
      email,
      phoneNumber,
      currentWebsite,
      companyName,
    } = body;

    const maintenanceServiceOrder = await db.maintenanceService.create({
      data: {
        platform,
        currentIssues,
        requiredServices,
        additionalInformation,
        updateFrequency,
        supportLevel,
        price,
        selectedPlan,
        monthlyTraffic,
        fullName,
        email,
        phoneNumber,
        currentWebsite,
        companyName,
      },
    });

    const serviceDetails = {
      name: "Maintenance Service ",
      plan: selectedPlan,
      price: `$${parseFloat(price).toLocaleString()}`,
      features: [...requiredServices],
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
          startDate: "After Confimations",
        }),
      });
      console.log("Email Response:", emailResponse);
    } catch (emailError) {
      console.error("[EMAIL ERROR]", emailError);
    }

    return NextResponse.json(maintenanceServiceOrder);
  } catch (error) {
    console.error("[ORDERS ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const maintenanceServiceOrders = await db.maintenanceService.findMany({
      include: {
        Milestones: true,
      },
    });

    return NextResponse.json(maintenanceServiceOrders);
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
