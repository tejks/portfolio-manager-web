import React from "react";

import { TransactionData, TransactionType } from "@/common/store/transactionSlice";
import { cn } from "@/common/utils/cn";
import useTokenMetadata from "@/hooks/useTokenMetadata";

interface TransactionRowProps {
  row: TransactionData;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ row }) => {
  const tokenMetadata = useTokenMetadata(row.address);

  if (!tokenMetadata) return null;

  return (
    <tr key={row.address} className="rounded-lg text-center hover:bg-[#651b7415]">
      <td>
        <span
          className={cn(
            "rounded-lg border-2 px-2.5 py-1 text-xs font-bold uppercase ",
            row.type === "buy"
              ? "border-green-800 bg-green-200 text-green-800"
              : "border-red-800 bg-red-200 text-red-800",
          )}
        >
          {row.type}
        </span>
      </td>
      <td className="ml-5 flex items-center justify-center py-4">
        <img src={tokenMetadata.logoURI} alt={tokenMetadata.name} className="mr-2 h-6 w-6 rounded-full" />
        <span className="text-sm font-semibold text-gray-900">{tokenMetadata.symbol}</span>
      </td>
      <td>{tokenMetadata.name}</td>
      <td>{row.broker}</td>
      <td className={cn("font-semibold", row.type === TransactionType.BUY ? "text-green-700" : "text-red-700")}>
        {row.type === TransactionType.BUY ? "+" : "-"} {row.amount}
      </td>
      <td>{row.price}</td>
      <td>{row.date}</td>
    </tr>
  );
};

export default TransactionRow;
