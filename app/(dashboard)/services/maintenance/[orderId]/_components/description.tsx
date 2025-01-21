"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DescriptionProps {
  order: {
    requirements: string;
    additionalInformation: string;
  };
}

const Description = ({ order }: DescriptionProps) => {
  return (
    <div className="space-y-2">
      {" "}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-zinc-700">{order.additionalInformation}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Description;
