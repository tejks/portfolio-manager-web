import { useEffect, useState } from "react";
import tokens from "@/assets/tokens.json";

export interface TokenMetadata {
  address: string;
  chainId: number;
  decimals: number;
  name: string;
  logoURI: string;
  symbol: string;
}

export default function useTokenMetadata(account: string) {
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetadata | null>(null);

  useEffect(() => {
    const token = tokens.find((token) => token.address === account);
    if (token) setTokenMetadata({ ...token });
  }, [account]);

  return tokenMetadata;
}
