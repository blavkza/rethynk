import ServiceConfirmationEmail from "@/app/emails/service-confimation-email";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      cmsType,
      budgetRange,
      requiredFeatures,
      additionalInformation,
      requirements,
      numberOfusers,
      timeline,
      fullName,
      email,
      phoneNumber,
      currentWebsite,
      companyName,
    } = body;

    const CmsService = await db.cMSService.create({
      data: {
        cmsType,
        budgetRange,
        requiredFeatures,
        additionalInformation,
        requirements,
        numberOfusers,
        timeline,
        fullName,
        email,
        phoneNumber,
        currentWebsite,
        companyName,
      },
    });

    const serviceDetails = {
      name: "CMS SERVICE",
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

    return NextResponse.json(CmsService);
  } catch (error) {
    console.error("[ORDERS ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const CmsService = await db.cMSService.findMany({
      include: {
        Milestones: true,
      },
    });

    return NextResponse.json(CmsService);
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

    const updatedCmsServiceId = await db.cMSService.update({
      where: { id: EcommerceServiceId },
      data: { status },
    });

    return NextResponse.json(updatedCmsServiceId);
  } catch (error) {
    console.error("[ORDER STATUS UPDATE ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
