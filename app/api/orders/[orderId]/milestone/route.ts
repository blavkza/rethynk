import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = await params;

    const { title, dueDate } = await req.json();

    if (!title || !dueDate) {
      return new NextResponse("Title and due date are required.", {
        status: 400,
      });
    }

    const milestone = await db.milestone.create({
      data: {
        title,
        dueDate,
        orderId: orderId,
      },
    });

    return NextResponse.json(milestone);
  } catch (error) {
    console.error("[ORDER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
