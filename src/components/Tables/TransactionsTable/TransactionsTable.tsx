import React from "react";

import { TransactionData } from "@/common/store/transactionSlice";
import SortingCell from "../SortingCell";
import TransactionRow from "./TransactionRow";

interface TransactionsTableProps {
  data: TransactionData[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ data }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-center font-normal text-neutral-600">
          <SortingCell>Type</SortingCell>
          <SortingCell>Ticker</SortingCell>
          <SortingCell>Name</SortingCell>
          <SortingCell>Broker</SortingCell>
          <SortingCell>Amount</SortingCell>
          <SortingCell>Price</SortingCell>
          <SortingCell>Date</SortingCell>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <TransactionRow key={row.id} row={row} />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
