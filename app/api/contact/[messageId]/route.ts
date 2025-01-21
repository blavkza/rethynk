import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { messageId: string } }
) {
  try {
    const { messageId } = await params;
    const values = await req.json();

    const message = await db.message.update({
      where: {
        id: messageId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.log("[MESSAGR_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
