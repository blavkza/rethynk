"use client";

import { ServiceTable, type ServiceOrder } from "@/components/service-table";
import { useEffect, useState } from "react";

export default function MaintenancePage() {
  const [maintenanceOrders, setMaintenanceOrders] = useState<
    ServiceOrder[] | null
  >(null);

  useEffect(() => {
    const fetchWebDevOrders = async () => {
      try {
        const response = await fetch("/api/services/maintenance");
        if (response.ok) {
          const data: ServiceOrder[] = await response.json();
          setMaintenanceOrders(data);
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

  const getOrderLink = (id: string) => `/services/maintenance/${id}`;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Maintenance Projects</h1>
      </div>
      <ServiceTable orders={maintenanceOrders} orderLink={getOrderLink} />
    </div>
  );
}
