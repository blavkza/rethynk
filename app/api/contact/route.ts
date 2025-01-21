import Contact from "@/app/emails/contact";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();
    const { fullName, email, phoneNumber, subject, inquiry } = body;

    // Save the message to the database
    const message = await db.message.create({
      data: {
        fullName,
        email,
        phoneNumber,
        subject,
        inquiry,
      },
    });

    let emailResponse;
    try {
      emailResponse = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Thank you for contacting RE:THYNKWeb Studios",
        react: Contact({
          name: fullName,
          message: `Thank you for reaching out about "${subject}". We've received your message and will get back to you shortly.`,
          service: subject,
        }),
      });
      console.log("Email Response:", emailResponse);
    } catch (emailError) {
      console.error("[EMAIL ERROR]", emailError);
    }

    return NextResponse.json({ message, emailResponse });
  } catch (error) {
    console.error("[MESSAGE ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await db.message.findMany({});

    return NextResponse.json(messages);
  } catch (error) {
    console.error("[MESSAGE ERROR]", error);
    return NextResponse.error();
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { messageId, status } = body;

    if (!messageId || !status) {
      return new NextResponse("Message ID and status are required", {
        status: 400,
      });
    }

    const updatedMessage = await db.message.update({
      where: { id: messageId },
      data: { status },
    });

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.error("[MESSAGE STATUS UPDATE ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
