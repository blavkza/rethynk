import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const recentOrders = [
  {
    client: "John Doe",
    service: "Website Development",
    amount: "$2,500",
  },
  {
    client: "Jane Smith",
    service: "E-commerce Platform",
    amount: "$4,000",
  },
  {
    client: "Mike Johnson",
    service: "SEO Optimization",
    amount: "$1,200",
  },
  {
    client: "Sarah Williams",
    service: "Mobile App",
    amount: "$5,000",
  },
]

export function RecentOrders() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client</TableHead>
          <TableHead>Service</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentOrders.map((order) => (
          <TableRow key={order.client}>
            <TableCell className="font-medium">{order.client}</TableCell>
            <TableCell>{order.service}</TableCell>
            <TableCell className="text-right">{order.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

