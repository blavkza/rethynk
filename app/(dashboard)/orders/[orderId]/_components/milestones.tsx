"use client";

import React, { useState } from "react";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Ban, CheckCircle, Clock, Plus, Trash2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Milestone, Order } from "@prisma/client";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  dueDate: z.string().refine((date) => !isNaN(new Date(date).getTime()), {
    message: "Invalid date",
  }),
});

type MilestoneStatus = "pending" | "in-progress" | "completed";

interface MilestoneProps {
  order: Order & { milestones: Milestone[] };
}

const Milestone = ({ order }: MilestoneProps) => {
  const [orderData, setOrderData] = useState<
    (Order & { milestones: Milestone[] }) | null
  >(order);
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateMilestoneStatus = async (
    milestoneId: string,
    newStatus: MilestoneStatus
  ) => {
    try {
      await axios.patch(`/api/milestones/${milestoneId}/status`, {
        status: newStatus,
      });
      setOrderData((prev) =>
        prev
          ? {
              ...prev,
              milestones: prev.milestones.map((milestone) =>
                milestone.id === milestoneId
                  ? { ...milestone, status: newStatus }
                  : milestone
              ),
            }
          : null
      );
      toast.success("Milestone status updated");
    } catch {
      toast.error("Failed to update milestone status");
    }
  };

  const deleteMilestone = async (milestoneId: string) => {
    try {
      await axios.delete(`/api/milestones/${milestoneId}`);
      setOrderData((prev) =>
        prev
          ? {
              ...prev,
              milestones: prev.milestones.filter(
                (milestone) => milestone.id !== milestoneId
              ),
            }
          : null
      );
      toast.success("Milestone deleted");
    } catch {
      toast.error("Failed to delete milestone");
    }
  };

  const getStatusIcon = (status: MilestoneStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-gray-500" />;
      default:
        return <Ban className="h-4 w-4 text-red-500" />;
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      dueDate: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `/api/orders/${order.id}/milestone`,
        values
      );
      setOrderData(response.data);
      toast.success("Milestone added");
      setIsAddingMilestone(false);
    } catch {
      toast.error("Failed to add milestone");
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  return (
    <div className="w-full">
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Project Milestones</CardTitle>
          <Dialog open={isAddingMilestone} onOpenChange={setIsAddingMilestone}>
            <DialogTrigger asChild>
              <Button size="sm" aria-label="Add Milestone">
                <Plus className="h-4 w-4 mr-2" />
                Add Milestone
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Milestone</DialogTitle>
                <DialogDescription>
                  Add a new milestone to track project progress.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter milestone title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingMilestone(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Adding..." : "Add Milestone"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderData?.milestones?.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  {getStatusIcon(milestone.status as MilestoneStatus)}
                  <span>{milestone.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-muted-foreground">
                    {milestone.dueDate
                      ? format(new Date(milestone.dueDate), "yyyy-MM-dd")
                      : "No due date"}
                  </div>
                  <Select
                    value={milestone.status ?? undefined}
                    onValueChange={(value: MilestoneStatus) =>
                      updateMilestoneStatus(milestone.id, value)
                    }
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteMilestone(milestone.id)}
                    aria-label="Delete Milestone"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Milestone;
