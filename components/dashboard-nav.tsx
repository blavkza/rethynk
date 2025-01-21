"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ShoppingCart,
  MessageSquare,
  Settings,
  ChevronDown,
  Palette,
  Code2,
  ShoppingBag,
  Database,
  Search,
  WrenchIcon,
  Smartphone,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const serviceRoutes = [
  {
    label: "Web Design",
    icon: Palette,
    href: "/services/web-design",
    color: "text-pink-500",
  },
  {
    label: "Web Development",
    icon: Code2,
    href: "/services/web-development",
    color: "text-blue-500",
  },
  {
    label: "E-commerce",
    icon: ShoppingBag,
    href: "/services/e-commerce",
    color: "text-green-500",
  },
  {
    label: "CMS Integration",
    icon: Database,
    href: "/services/cms-integration",
    color: "text-purple-500",
  },

  {
    label: "Maintenance",
    icon: WrenchIcon,
    href: "/services/maintenance",
    color: "text-orange-500",
  },
  {
    label: "Mobile App",
    icon: Smartphone,
    href: "/services/mobile-app",
    color: "text-cyan-500",
  },
];

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    href: "/orders",
    color: "text-violet-500",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/messages",
    color: "text-pink-700",
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav className="flex flex-col space-y-2">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex items-center gap-x-2 text-sm font-medium text-muted-foreground",
            pathname === route.href && "text-primary font-bold"
          )}
        >
          <Button variant="ghost" className="w-full justify-start gap-2">
            <route.icon className={cn("h-5 w-5", route.color)} />
            {route.label}
          </Button>
        </Link>
      ))}

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between gap-2">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-orange-500" />
              <span>Services</span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4 mt-2">
          {serviceRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-x-2 text-sm font-medium text-muted-foreground",
                pathname === route.href && "text-primary font-bold"
              )}
            >
              <Button variant="ghost" className="w-full justify-start gap-2">
                <route.icon className={cn("h-5 w-5", route.color)} />
                {route.label}
              </Button>
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </nav>
  );
}
