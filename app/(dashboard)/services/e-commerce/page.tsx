"use client";

import { ServiceTable, type ServiceOrder } from "@/components/service-table";
import { useEffect, useState } from "react";

export default function EcommercePage() {
  const [ecommerceOrders, setEcommerceOrders] = useState<ServiceOrder[] | null>(
    null
  );

  useEffect(() => {
    const fetchWebDevOrders = async () => {
      try {
        const response = await fetch("/api/services/e-commerce");
        if (response.ok) {
          const data: ServiceOrder[] = await response.json();
          setEcommerceOrders(data);
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

  const getOrderLink = (id: string) => `/services/e-commerce/${id}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">E-commerce Projects</h1>
      </div>
      <ServiceTable orders={ecommerceOrders} orderLink={getOrderLink} />
    </div>
  );
}
