"use client";

import { ServiceTable, type ServiceOrder } from "@/components/service-table";
import { useEffect, useState } from "react";

export default function WebDevelopmentPage() {
  const [webDevOrders, setWebDevOrders] = useState<ServiceOrder[] | null>(null);

  useEffect(() => {
    const fetchWebDevOrders = async () => {
      try {
        const response = await fetch("/api/services/web-development");
        if (response.ok) {
          const data: ServiceOrder[] = await response.json();
          setWebDevOrders(data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("[FETCH ERROR]", error);
      } finally {
      }
    };

    fetchWebDevOrders();
  }, []);

  const getOrderLink = (id: string) => `/services/web-development/${id}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Web Development Projects</h1>
      </div>

      <ServiceTable orders={webDevOrders} orderLink={getOrderLink} />
    </div>
  );
}
