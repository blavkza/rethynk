"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil, Reply } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  reply: z.string().min(1, { message: "Reply is required" }),
});

interface ReplyFormProps {
  data: {
    id: string;
    reply: string;
  };
}

const ReplyForm = ({ data }: ReplyFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reply: data.reply || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        ...values,
        status: "replied",
      };

      await axios.patch(`/api/contact/${data.id}`, payload);
      toast.success("Reply sent");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <CardTitle>Reply</CardTitle>
              <CardDescription>Compose a reply to this message</CardDescription>
            </div>

            <Button
              onClick={toggleEdit}
              variant="ghost"
              size="sm"
              aria-label={isEditing ? "Cancel editing" : "Edit reply"}
            >
              {isEditing ? "Cancel" : <Pencil size={16} />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!isEditing ? (
              <p className="text-sm text-center mt-2 py-1">
                {data.reply || "No reply yet."}
              </p>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="reply"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea placeholder="Enter your reply" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      aria-label="Send reply"
                    >
                      <Reply className="mr-2 h-4 w-4" />
                      Send Reply
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReplyForm;
