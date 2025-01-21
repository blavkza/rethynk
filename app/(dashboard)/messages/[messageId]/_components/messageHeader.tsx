import { ArrowLeft, Mail, Clock, CheckCheck, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface MessageHeadeProps {
  data: {
    id: string;
    status: string;
  };
}

const MessageHeader = ({ data }: MessageHeadeProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Link href="/messages">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Message </h1>
      </div>
      <Badge
        style={
          data.status === "read"
            ? { backgroundColor: "#38ba50", color: "white" }
            : data.status === "replied"
            ? { backgroundColor: "#facc15", color: "black" }
            : data.status === "unread"
            ? { backgroundColor: "red", color: "black" }
            : {}
        }
      >
        {data.status.toUpperCase()}
      </Badge>
    </div>
  );
};

export default MessageHeader;
