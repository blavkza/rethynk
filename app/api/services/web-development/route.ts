import ServiceConfirmationEmail from "@/app/emails/service-confimation-email";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      projectType,
      budgetRange,
      requiredFeatures,
      additionalInformation,
      requirements,
      stack,
      timeline,
      fullName,
      email,
      phoneNumber,
      companyName,
    } = body;

    const WebDevelopmentService = await db.webDevelopmentService.create({
      data: {
        projectType,
        budgetRange,
        requiredFeatures,
        additionalInformation,
        requirements,
        stack,
        timeline,
        fullName,
        email,
        phoneNumber,
        companyName,
      },
    });

    const serviceDetails = {
      name: "WEB DEVELOPMENT SERVICE",
      price: budgetRange,
      features: [additionalInformation],
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

    return NextResponse.json(WebDevelopmentService);
  } catch (error) {
    console.error("[ORDERS ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const WebDevelopmentService = await db.webDevelopmentService.findMany({
      include: {
        Milestones: true,
      },
    });

    return NextResponse.json(WebDevelopmentService);
  } catch (error) {
    console.error("[ORDERS ERROR]", error);
    return NextResponse.error();
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { WebDevelopmentServiceId, status } = body;

    if (!WebDevelopmentServiceId || !status) {
      return new NextResponse("Order ID and status are required", {
        status: 400,
      });
    }

    const updatedWebDevelopmentService = await db.webDevelopmentService.update({
      where: { id: WebDevelopmentServiceId },
      data: { status },
    });

    return NextResponse.json(updatedWebDevelopmentService);
  } catch (error) {
    console.error("[ORDER STATUS UPDATE ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
