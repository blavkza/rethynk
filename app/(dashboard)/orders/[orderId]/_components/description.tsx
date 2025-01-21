"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DescriptionProps {
  order: {
    description: string;
  };
}

const Description = ({ order }: DescriptionProps) => {
  return (
    <div className="">
      {" "}
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{order.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Description;
