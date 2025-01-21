import ServiceConfirmationEmail from "@/app/emails/service-confimation-email";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      appType,
      platform,
      budgetRange,
      requiredFeatures,
      additionalInformation,
      description,
      designRequirements,
      timeline,
      fullName,
      email,
      phoneNumber,
      currentWebsite,
      companyName,
    } = body;

    const MobileAppService = await db.mobileAppService.create({
      data: {
        appType,
        platform,
        budgetRange,
        requiredFeatures,
        additionalInformation,
        description,
        designRequirements,
        timeline,
        fullName,
        email,
        phoneNumber,
        currentWebsite,
        companyName,
      },
    });

    const serviceDetails = {
      name: "MOBILE APP SERVICE",
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

    return NextResponse.json(MobileAppService);
  } catch (error) {
    console.error("[MOBILE_APP_SERVICE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const MobileAppService = await db.mobileAppService.findMany({
      include: {
        Milestones: true,
      },
    });

    return NextResponse.json(MobileAppService);
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
