import { useEffect, useState } from "react";

const CURRENCYPRICE = new Map<string, number>([["PLN", 4.2]]);

export default function useCurrencyPrice(currency: string) {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    setPrice(CURRENCYPRICE.get(currency) || null);
  }, [currency]);

  return price;
}
