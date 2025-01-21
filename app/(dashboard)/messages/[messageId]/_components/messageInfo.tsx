"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

interface MessageInfoProps {
  data: {
    fullName: string;
    email: string;
    phoneNumber: string;
    subject: string;
    inquiry: string;
    createdAt: string;
  };
}

const MessageInfo = ({ data }: MessageInfoProps) => {
  const formatDate = (dateString: string) => {
    const createdAt = new Date(dateString);
    return createdAt.toLocaleDateString("en-GB");
  };

  return (
    <div className="">
      {" "}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle>{data.subject}</CardTitle>
              <CardDescription>From: {data.fullName}</CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">
              {formatDate(data.createdAt)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Contact Information</div>
              <div className="text-sm">
                <div>Email: {data.email}</div>
                <div>Phone: {data.phoneNumber}</div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="text-sm font-medium">Subject</div>
              <div className="whitespace-pre-wrap text-sm">{data.subject}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Message</div>
              <div className="whitespace-pre-wrap text-sm">{data.inquiry}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageInfo;
