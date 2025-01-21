import MessageInfo from "./_components/messageInfo";
import MessageHestory from "./_components/messageHestory";
import ReplyForm from "./_components/reply-form";
import MessageHeader from "./_components/messageHeader";
import { db } from "@/lib/db";

const MessagePage = async ({ params }: { params: { messageId: string } }) => {
  const message = await db.message.findUnique({
    where: {
      id: params.messageId,
    },
  });

  return (
    <div className="space-y-6">
      <MessageHeader data={message} />

      <div className="grid gap-6">
        <MessageInfo data={message} />

        <MessageHestory data={message} />

        <ReplyForm data={message} />
      </div>
    </div>
  );
};

export default MessagePage;
