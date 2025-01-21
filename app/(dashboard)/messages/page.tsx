"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import toast from "react-hot-toast";

type Messages = {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  status: string;
  inquiry: string;
  createdAt: string;
};

type MessageStatus = "unread" | "read" | "replied";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Messages[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/contact");
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("[FETCH ERROR]", error);
      }
    };

    fetchMessages();
  }, []);

  const updateMessageStatus = async (id: string, newStatus: MessageStatus) => {
    try {
      const currentMessage = messages.find((message) => message.id === id);
      if (
        currentMessage?.status === "read" ||
        currentMessage?.status === "replied"
      ) {
        return;
      }

      const response = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update message status");
      }

      toast.success("Message Updated");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const formatDate = (dateString: string) => {
    const createdAt = new Date(dateString);
    return createdAt.toLocaleDateString("en-GB");
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{message.fullName}</div>
                    <div className="text-sm text-muted-foreground">
                      {message.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{message.subject}</TableCell>
                <TableCell>
                  <Badge
                    style={
                      message.status === "read"
                        ? { backgroundColor: "#38ba50", color: "white" }
                        : message.status === "replied"
                        ? { backgroundColor: "#facc15", color: "white" }
                        : message.status === "unread"
                        ? { backgroundColor: "red", color: "white" }
                        : {}
                    }
                  >
                    {message.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(message.createdAt)}</TableCell>
                <TableCell>
                  <Link href={`/messages/${message.id}`}>
                    <button
                      className="text-sm text-blue-500 hover:text-blue-700"
                      onClick={() => updateMessageStatus(message.id, "read")}
                    >
                      View Details
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
