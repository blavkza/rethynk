import ClientInfo from "./_components/clientInfo";
import OrderDetails from "./_components/order-details";
import Milestone from "./_components/milestones";
import Payment from "./_components/paymant";
import AddNote from "./_components/add-note";
import HeaderSection from "./_components/header-section";
import { db } from "@/lib/db";
import Description from "./_components/description";

const OrderPage = async ({ params }: { params: { orderId: string } }) => {
  const order = await db.webDevelopmentService.findUnique({
    where: {
      id: params.orderId,
    },
    include: {
      Milestones: true,
    },
  });

  return (
    <div className="space-y-6">
      <HeaderSection order={order} />

      <div className="grid gap-6 md:grid-cols-2">
        <ClientInfo order={order} />

        <OrderDetails order={order} />

        <div className="md:col-span-2">
          <Description order={order} />
        </div>

        <div className="md:col-span-2">
          <Milestone order={order} />
        </div>

        <div className="md:col-span-2">
          <Payment />
        </div>

        <div className="md:col-span-2">
          <AddNote />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
