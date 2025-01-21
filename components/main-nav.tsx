import Link from "next/link";
import { Code2 } from "lucide-react";

export function MainNav() {
  return (
    <div className="flex items-center space-x-6 mr-4">
      <Link href="/" className="flex items-center space-x-2">
        <Code2 className="h-6 w-6" />
        <span className="font-bold inline-block">RE:THYNKWeb Studio</span>
      </Link>
    </div>
  );
}
