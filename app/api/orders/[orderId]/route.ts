import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = await params;
    const values = await req.json();

    const order = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
