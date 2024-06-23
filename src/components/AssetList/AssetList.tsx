import React from "react";
import tokens from "@/assets/tokens.json";

import { LazyLoadImage } from "react-lazy-load-image-component";
import Searchbar from "./Searchbar";

interface AssetListProps {
  onElementClick: (address: string) => void;
}

const AssetList: React.FC<AssetListProps> = ({ onElementClick }) => {
  return (
    <div className="flex h-full flex-col items-start">
      <div className="px-6 py-2">
        <Searchbar />
      </div>

      <div className="flex w-full flex-col overflow-y-scroll">
        {tokens.map((token) => {
          return (
            <div
              key={token.address}
              onClick={() => onElementClick(token.address)}
              className="flex cursor-pointer items-center py-4 hover:bg-neutral-200"
            >
              <LazyLoadImage alt={token.symbol} className="mx-6 h-11 w-11 rounded-full" src={token.logoURI} />

              <div className="flex flex-col">
                <div>{token.symbol}</div>
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
