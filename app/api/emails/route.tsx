import welcome from "@/app/emails/welcome";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "vvhuhwavho8@gmail.com",
      subject: "hello world!",
      react: welcome(),
    });

    // Return a successful response
    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
