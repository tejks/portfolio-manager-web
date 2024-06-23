import React from "react";

import { PortfolioData } from "@/common/store/portfolioSlice";
import SortingCell from "../SortingCell";
import PortfolioRow from "./PortfolioRow";

interface PortfolioTableProps {
  data: PortfolioData[];
}

const PortfolioTable: React.FC<PortfolioTableProps> = ({ data }) => {
  const allTokensValue = data.reduce(
    (acc, row) => acc + row.currentPrice * row.data.reduce((acc, row) => acc + row.amount, 0),
    0,
  );

  return (
    <table className="portfolio-table w-full">
      <thead>
        <tr className="text-center font-normal text-neutral-600">
          <th></th>
          <SortingCell>Ticker</SortingCell>
          <SortingCell>Name</SortingCell>
          <SortingCell>Broker</SortingCell>
          <SortingCell>Amount</SortingCell>
          <SortingCell>Avg Price</SortingCell>
          <SortingCell>Current Price</SortingCell>
          <SortingCell>Price Chg %</SortingCell>
          <SortingCell>Value USD</SortingCell>
          <SortingCell>Value PLN</SortingCell>
          <SortingCell>Current Share</SortingCell>
        </tr>
      </thead>
      <tbody className="relative">
        {data.map((row) => (
          <PortfolioRow key={row.address} row={row} allTokensValue={allTokensValue} />
        ))}
      </tbody>
    </table>
  );
};

export default PortfolioTable;
