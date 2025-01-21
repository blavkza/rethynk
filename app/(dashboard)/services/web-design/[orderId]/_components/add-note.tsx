"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const AddNote = () => {
  return (
    <div className="">
      {" "}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Add Note</CardTitle>
          <CardDescription>
            Add a note to this order that will be visible to the team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Type your note here..."
            className="min-h-[100px]"
          />
          <Button className="mt-4">Add Note</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNote;
