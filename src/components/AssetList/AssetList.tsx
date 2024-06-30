import React, { useState } from "react";

import { Token } from "@/common/API/models/token.model";
import { useGetTokensQuery } from "@/common/API/services/tokens";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CircleLoader } from "react-spinners";
import Searchbar from "./Searchbar";

interface AssetListProps {
  onElementClick: (id: string) => void;
}

const AssetList: React.FC<AssetListProps> = ({ onElementClick }) => {
  const { data, isLoading } = useGetTokensQuery();
  const [filteredData, setFilteredData] = useState<Token[] | null>(data || null);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!data) return;
    if (e.target.value === "") setFilteredData(data);
    const result = data.filter((token) => token.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredData(result);
  };

  if (isLoading || !data || !filteredData)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <CircleLoader color="#000" />
      </div>
    );

  return (
    <div className="flex h-full flex-col items-start">
      <div className="px-6 py-2">
        <Searchbar onChange={onSearchChange} />
      </div>

      <div className="flex w-full flex-col overflow-y-scroll">
        {filteredData.map((token) => {
          return (
            <div
              key={token.id}
              onClick={() => onElementClick(token.id)}
              className="flex cursor-pointer items-center py-4 hover:bg-neutral-200"
            >
              <LazyLoadImage alt={token.symbol} className="mx-6 h-11 w-11 rounded-full" src={token.logo} />

              <div className="flex flex-col">
                <div>{token.symbol.toLocaleUpperCase()}</div>
                <div className="text-sm text-neutral-400">{token.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssetList;
