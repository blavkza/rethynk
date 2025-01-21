"use client";

import { ServiceTable, type ServiceOrder } from "@/components/service-table";
import { useEffect, useState } from "react";

export default function WebDesignPage() {
  const [webDesignOrders, setWebDesignOrders] = useState<ServiceOrder[] | null>(
    null
  );

  useEffect(() => {
    const fetchWebDesignOrders = async () => {
      try {
        const response = await fetch("/api/services/web-design");
        if (response.ok) {
          const data: ServiceOrder[] = await response.json();
          setWebDesignOrders(data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("[FETCH ERROR]", error);
      }
    };

    fetchWebDesignOrders();
  }, []);

  const getOrderLink = (id: string) => `/services/web-design/${id}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Web Design Projects</h1>
      </div>
      <ServiceTable orders={webDesignOrders} orderLink={getOrderLink} />
    </div>
  );
}
