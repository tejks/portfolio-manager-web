import { TransactionResponse, useGetTransactionsWithUserIdQuery } from "@/common/API/services/transactions";
import React, { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import TransactionsTable from "../TransactionsTable/TransactionsTable";

interface TokenTransactionsTableProps {
  userId: string;
  tokenId: string;
}

const TokenTransactionsTable: React.FC<TokenTransactionsTableProps> = ({ userId, tokenId }) => {
  const { data: transactions, isLoading } = useGetTransactionsWithUserIdQuery(userId, {
    refetchOnMountOrArgChange: true,
  });
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionResponse[] | null>(null);

  useEffect(() => {
    if (transactions) setFilteredTransactions(transactions.filter((transaction) => transaction.token.id === tokenId));
  }, [tokenId, transactions]);

  if (isLoading)
    return (
      <div className="mt-72 flex h-full w-full items-center justify-center">
        <CircleLoader color="#000" />
      </div>
    );

  if (!filteredTransactions) return <div>Not found</div>;

  return <TransactionsTable data={filteredTransactions} />;
};

export default TokenTransactionsTable;
