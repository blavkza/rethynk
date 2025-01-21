"use client";

import { ServiceTable, type ServiceOrder } from "@/components/service-table";
import { useEffect, useState } from "react";

export default function MobileAppPage() {
  const [mobileAppOrders, setMobileAppOrders] = useState<ServiceOrder[] | null>(
    null
  );
  useEffect(() => {
    const fetchWebDevOrders = async () => {
      try {
        const response = await fetch("/api/services/mobile-app");
        if (response.ok) {
          const data: ServiceOrder[] = await response.json();
          setMobileAppOrders(data);
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

  const getOrderLink = (id: string) => `/services/mobile-app/${id}`;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mobile App Projects</h1>
      </div>
      <ServiceTable orders={mobileAppOrders} orderLink={getOrderLink} />
    </div>
  );
}
