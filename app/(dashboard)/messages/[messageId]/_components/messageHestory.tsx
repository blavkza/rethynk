"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CheckCheck, Clock, Mail } from "lucide-react";

interface MessageHestoryProps {
  data: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
}

const MessageHestory = ({ data }: MessageHestoryProps) => {
  const formatDate = (dateString: string) => {
    const createdAt = new Date(dateString);
    return createdAt.toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Message History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <Mail className="w-5 h-5 text-blue-600" />
                <h3>Received</h3>
              </div>
              <span className="text-zinc-700 text-sm">
                {formatDate(data.createdAt)}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <Clock className="w-5 h-5 text-green-500" />
                <h3>Opeaned At</h3>
              </div>
              <span className="text-zinc-700 text-sm">
                {formatDate(data.updatedAt)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageHestory;
