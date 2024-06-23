import React from "react";

import { PortfolioData } from "@/common/store/portfolioSlice";
import { cn } from "@/common/utils/cn";
import useCurrencyPrice from "@/hooks/useCurrencyPrice";
import useTokenMetadata from "@/hooks/useTokenMetadata";
import { useNavigate } from "react-router-dom";

interface PortfolioRowProps {
  row: PortfolioData;
  allTokensValue: number;
}

const PortfolioRow: React.FC<PortfolioRowProps> = ({ row, allTokensValue }) => {
  const navigator = useNavigate();
  const tokenMetadata = useTokenMetadata(row.address);
  const mainCurrencyPrice = useCurrencyPrice("PLN");
  const fullAmount = row.data.reduce((acc, row) => acc + row.amount, 0);
  const avgPrice = row.data.reduce((acc, row) => acc + row.avgPrice, 0) / row.data.length;

  if (!tokenMetadata) return null;

  const getCurrentShare = () => (allTokensValue === 0 ? 0 : ((fullAmount * row.currentPrice) / allTokensValue) * 100);
  const getDolarValue = () => fullAmount * row.currentPrice;
  const getMainCurrencyValue = () => (mainCurrencyPrice ? fullAmount * row.currentPrice * mainCurrencyPrice : 0);
  const getPriceChange = () => ((row.currentPrice - avgPrice) / avgPrice) * 100;

  const priceChangeStyles = (change: number) => {
    if (change > 0) return "text-green-600";
    else if (change < 0) return "text-red-600";
    return "text-neutral-600";
  };

  return (
    <tr
      key={row.address}
      className="cursor-pointer rounded-lg text-right hover:bg-[#651b7415]"
      onClick={() => navigator(`tokens/${row.address}`)}
    >
      <td className="px-7 py-5 text-left">
        <img src={tokenMetadata.logoURI} alt={tokenMetadata.name} className="h-8 w-8 rounded-full" />
      </td>
      <td>
        <div className="text-left text-sm font-semibold text-gray-900">{tokenMetadata.symbol}</div>
      </td>
      <td className="text-center">{tokenMetadata.name}</td>
      <td className="text-center">{row.data[0].broker}</td>
      <td>{fullAmount}</td>
      <td>{avgPrice}</td>
      <td>{row.currentPrice}</td>
      <td className={cn("font-semibold", priceChangeStyles(getPriceChange()))}>{getPriceChange().toFixed(1)} %</td>
      <td>{getDolarValue().toFixed(2)}</td>
      <td>{getMainCurrencyValue().toFixed(2)}</td>
      <td>{getCurrentShare().toFixed(1)} %</td>
    </tr>
  );
};

export default PortfolioRow;
