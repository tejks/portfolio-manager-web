import { useGetSummerizedTransactionsQuery } from "@/common/API/services/transactions";
import { useTypedSelector } from "@/common/store";
import { selectCurrentUser } from "@/common/store/authSlice";
import PortfolioTable from "@/components/Tables/PortfolioTable/ProftolioTable";
import React from "react";
import { CircleLoader } from "react-spinners";

const Portfolio: React.FC = () => {
  const user = useTypedSelector(selectCurrentUser);

  const { data: portfolio, isLoading } = useGetSummerizedTransactionsQuery(user?.id as string, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <main className="container mx-auto">
      <h1 className="mt-8 text-3xl font-semibold">Portfolio</h1>

      {!user ? (
        <div className="mt-80 text-center text-xl">You need to login</div>
      ) : isLoading ? (
        <div className="mt-96 flex justify-center">
          <CircleLoader color="#000" />
        </div>
      ) : !portfolio || portfolio.length === 0 ? (
        <div className="mt-80 text-center text-xl">You don't have any assets</div>
      ) : (
        <>
          <div className="mt-16 flex justify-around">
            <div className="flex h-36 w-1/4 flex-col items-center rounded-2xl bg-gradient-to-r from-[#4a0d80] to-[#9537a8] text-neutral-300 shadow-md shadow-[#4c255069]">
              <p className="mt-4 text-xl">Total value in USD</p>
              <p className="mt-6 text-3xl font-medium">
                {portfolio
                  .reduce(
                    (acc, row) => acc + (row.totalPositiveAmount + row.totalNegativeAmount) * row.token.currentPrice,
                    0,
                  )
                  .toFixed(2)}{" "}
                USD
              </p>
            </div>
            <div className="flex h-36 w-1/4 flex-col items-center rounded-2xl bg-gradient-to-r from-[#4a0d80] to-[#9537a8] text-neutral-300 shadow-md shadow-[#4c255069]">
              <p className="mt-4 text-xl">Total value in PLN</p>
              <p className="mt-6 text-3xl font-medium">
                {portfolio
                  .reduce(
                    (acc, row) =>
                      acc + (row.totalPositiveAmount + row.totalNegativeAmount) * row.token.currentPrice * 4.2,
                    0,
                  )
                  .toFixed(2)}{" "}
                PLN
              </p>
            </div>
            <div className="flex h-36 w-1/4 flex-col items-center rounded-2xl bg-gradient-to-r from-[#4a0d80] to-[#9537a8] text-neutral-300 shadow-md shadow-[#4c255069]">
              <p className="mt-4 text-xl">Tokens count</p>
              <p className="mt-6 text-3xl font-medium">{portfolio.length}</p>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-start px-4 py-8">
            <h2 className="text-xl font-semibold">Your assets</h2>
          </div>

          <PortfolioTable data={portfolio} />
        </>
      )}
    </main>
  );
};

export default Portfolio;
