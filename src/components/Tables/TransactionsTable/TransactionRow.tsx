import React from "react";

import { TransactionResponse } from "@/common/API/services/transactions";
import { cn } from "@/common/utils/cn";

interface TransactionRowProps {
  row: TransactionResponse;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ row }) => {
  return (
    <tr key={row.id} className="rounded-lg text-center hover:bg-[#651b7415]">
      <td>
        <span
          className={cn(
            "rounded-lg border-2 px-2.5 py-1 text-xs font-bold uppercase ",
            row.transactionType === 0
              ? "border-green-800 bg-green-200 text-green-800"
              : "border-red-800 bg-red-200 text-red-800",
          )}
        >
          {row.transactionType === 0 ? "Buy" : "Sell"}
        </span>
      </td>
      <td className="ml-5 flex items-center justify-center py-4">
        <img src={row.token.logo} alt={row.token.name} className="mr-2 h-6 w-6 rounded-full" />
        <span className="text-sm font-semibold uppercase text-gray-900">{row.token.symbol}</span>
      </td>
      <td>{row.token.name}</td>
      <td className="flex items-center justify-center">
        <img src={row.broker.logo} alt="" className="h-4" />
      </td>
      <td className={cn("font-semibold", row.transactionType === 0 ? "text-green-700" : "text-red-700")}>
        {row.transactionType === 0 ? "+" : "-"} {row.quantity}
      </td>
      <td>{row.price}</td>
      <td>{(row.price * row.quantity).toFixed(2)} $</td>
      <td>{new Date(row.datetime).toDateString()}</td>
    </tr>
  );
};

export default TransactionRow;
