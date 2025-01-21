import ServiceConfirmationEmail from "@/app/emails/service-confimation-email";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      platform,
      budgetRange,
      requiredFeatures,
      additionalInformation,
      requirements,
      businessType,
      numberOfProducts,
      timeline,
      fullName,
      email,
      phoneNumber,
      currentWebsite,
      companyName,
    } = body;

    const EcommerceService = await db.ecommerceService.create({
      data: {
        platform,
        budgetRange,
        requiredFeatures,
        additionalInformation,
        requirements,
        businessType,
        numberOfProducts,
        timeline,
        fullName,
        email,
        phoneNumber,
        currentWebsite,
        companyName,
      },
    });

    const serviceDetails = {
      name: "E-commerce",
      price: budgetRange,
      features: [...requiredFeatures],
    };

    let emailResponse;
    try {
      emailResponse = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: `Service Order Confirmation - RE:THYNKWeb Studios`,
        react: ServiceConfirmationEmail({
          name: fullName,
          service: serviceDetails,
          startDate: timeline,
        }),
      });

      console.log("Email Response:", emailResponse);
    } catch (emailError) {
      console.error("[EMAIL ERROR]", emailError);
    }

    return NextResponse.json(EcommerceService);
  } catch (error) {
    console.error("[ORDERS ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const EcommerceService = await db.ecommerceService.findMany({
      include: {
        Milestones: true,
      },
    });

    return NextResponse.json(EcommerceService);
  } catch (error) {
    console.error("[ORDERS ERROR]", error);
    return NextResponse.error();
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { EcommerceServiceId, status } = body;

    if (!EcommerceServiceId || !status) {
      return new NextResponse("Order ID and status are required", {
        status: 400,
      });
    }

    const updatedEcommerceServiceId = await db.ecommerceService.update({
      where: { id: EcommerceServiceId },
      data: { status },
    });

    return NextResponse.json(updatedEcommerceServiceId);
  } catch (error) {
    console.error("[ORDER STATUS UPDATE ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
