import React from "react";

import { SummarisedTransactionResponse } from "@/common/API/services/transactions";
import { cn } from "@/common/utils/cn";
import useCurrencyPrice from "@/hooks/useCurrencyPrice";
import { useNavigate } from "react-router-dom";

interface PortfolioRowProps {
  row: SummarisedTransactionResponse;
  allTokensValue: number;
}

const PortfolioRow: React.FC<PortfolioRowProps> = ({ row, allTokensValue }) => {
  const navigator = useNavigate();
  const mainCurrencyPrice = useCurrencyPrice("PLN");
  const fullAmount = row.totalPositiveAmount - row.totalNegativeAmount;
  const avgPrice = row.averageBuyPrice;

  const getCurrentShare = () =>
    allTokensValue === 0 ? 0 : ((fullAmount * row.token.currentPrice) / allTokensValue) * 100;
  const getDolarValue = () => fullAmount * row.token.currentPrice;
  const getMainCurrencyValue = () => (mainCurrencyPrice ? fullAmount * row.token.currentPrice * mainCurrencyPrice : 0);
  const getPriceChange = () => ((row.token.currentPrice - avgPrice) / avgPrice) * 100;

  const priceChangeStyles = (change: number) => {
    if (change > 0) return "text-green-600";
    else if (change < 0) return "text-red-600";
    return "text-neutral-600";
  };

  return (
    <tr
      className="cursor-pointer rounded-lg text-right hover:bg-[#651b7415]"
      onClick={() => navigator(`tokens/${row.token.id}`)}
    >
      <td className="px-7 py-5 text-left">
        <img src={row.token.logo} alt={row.token.name} className="h-8 w-8 rounded-full" />
      </td>
      <td>
        <div className="text-left text-sm font-semibold uppercase text-gray-900">{row.token.symbol}</div>
      </td>
      <td className="text-center">{row.token.name}</td>
      <td className="flex items-center justify-center">
        <img src={row.brokers[0].logo} alt={row.brokers[0].name} className="h-4 w-20" />
        {row.brokers.length > 1 && <p className="ml-1 text-neutral-700">+ {row.brokers.length}</p>}
      </td>
      <td>{fullAmount}</td>
      <td>{avgPrice}</td>
      <td>{row.token.currentPrice}</td>
      <td className={cn("font-semibold", priceChangeStyles(getPriceChange()))}>{getPriceChange().toFixed(1)} %</td>
      <td>{getDolarValue().toFixed(2)}</td>
      <td>{getMainCurrencyValue().toFixed(2)}</td>
      <td>{getCurrentShare().toFixed(1)} %</td>
    </tr>
  );
};

export default PortfolioRow;
