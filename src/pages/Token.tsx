import { useGetTokenQuery } from "@/common/API/services/tokens";
import { TransactionResponse, useGetTransactionsWithUserIdQuery } from "@/common/API/services/transactions";
import { useTypedSelector } from "@/common/store";
import { selectCurrentUser } from "@/common/store/authSlice";
import { cn } from "@/common/utils/cn";
import TokenTransactionsTable from "@/components/Tables/TokenTable/TokenTransactionsTable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircleLoader } from "react-spinners";

const Token: React.FC = () => {
  const { id } = useParams();
  const { data: token, isLoading } = useGetTokenQuery(id as string);
  const user = useTypedSelector(selectCurrentUser);

  const { data: transactions, isLoading: isTransactionsLoading } = useGetTransactionsWithUserIdQuery(
    user?.id as string,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [filteredTransactions, setFilteredTransactions] = useState<TransactionResponse[] | null>(null);

  useEffect(() => {
    if (transactions) setFilteredTransactions(transactions.filter((transaction) => transaction.token.id === token?.id));
  }, [transactions, token]);

  const [tokenNav, setTokenNav] = useState([
    {
      name: "My transactions",
      isActive: true,
    },
  ]);

  const onSelected = (index: number) => setTokenNav(tokenNav.map((nav, i) => ({ ...nav, isActive: i === index })));

  if (isLoading || isTransactionsLoading)
    return (
      <div className="mt-96 flex h-full w-full items-center justify-center">
        <CircleLoader color="#000" />
      </div>
    );

  if (!token || !user || !transactions || !filteredTransactions) return null;
  return (
    <section className="container mx-auto px-10">
      <div className="mt-20 flex items-center justify-between">
        <div className="flex items-start">
          <img src={token.logo} alt={token.address} className="h-32 w-32 rounded-full" />

          <div>
            <div className="ml-5 flex items-end">
              <h1 className="mr-5 text-3xl text-neutral-800">{token.name}</h1>
              <span className="text-lg text-neutral-500">{token.symbol}</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex space-x-10 ">
            <div className="mr-60">
              <p className="text-2xl text-neutral-500">Current price</p>
              <p className="mt-5 text-4xl font-semibold text-neutral-800">{token.currentPrice}$</p>
            </div>
            <div>
              <p className="text-neutral-500">Total value</p>
              <p className="mt-5 text-2xl text-neutral-800">
                {filteredTransactions
                  .reduce(
                    (acc, e) =>
                      e.transactionType == 0
                        ? acc + e.quantity * token.currentPrice
                        : acc - e.quantity * token.currentPrice,
                    0,
                  )
                  .toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-neutral-500">Transactions count</p>
              <p className="mt-5 text-2xl text-neutral-800">{transactions.length}</p>
            </div>
            <div>
              <p className="text-neutral-500">Total value in PLN</p>
              <p className="mt-5 text-2xl text-neutral-800">
                {" "}
                {(
                  filteredTransactions.reduce(
                    (acc, e) =>
                      e.transactionType == 0
                        ? acc + e.quantity * token.currentPrice
                        : acc - e.quantity * token.currentPrice,
                    0,
                  ) * 4.2
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex space-x-10 text-neutral-500">
        <div className="w-full border-b border-neutral-400">
          {tokenNav.map((nav, i) => (
            <button
              className={cn(
                "border-b px-5 py-4 text-lg font-semibold",
                nav.isActive ? "border-purple-800 text-purple-800" : "hover:text-purple-800",
              )}
              onClick={() => onSelected(i)}
            >
              {nav.name}
            </button>
          ))}
        </div>
      </div>

      {tokenNav.find((nav) => nav.isActive)?.name === "My transactions" ? (
        <TokenTransactionsTable tokenId={token.id} userId={user.id} />
      ) : (
        <div>My portfolio</div>
      )}
    </section>
  );
};

export default Token;
