import { cn } from "@/common/utils/cn";
import useTokenMetadata from "@/hooks/useTokenMetadata";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Token: React.FC = () => {
  const { id } = useParams();
  const token = useTokenMetadata(id as string);

  const [tokenNav, setTokenNav] = useState([
    { name: "My portfolio", isActive: true },
    { name: "Transactions", isActive: false },
  ]);

  const onSelected = (index: number) => setTokenNav(tokenNav.map((nav, i) => ({ ...nav, isActive: i === index })));

  if (!token) return null;

  return (
    <section className="container mx-auto px-10">
      <div className="mt-20 flex items-center justify-between">
        <div className="flex items-start">
          <img src={token.logoURI} alt={token.address} className="h-32 w-32 rounded-lg" />

          <div>
            <div className="ml-5 flex items-end">
              <h1 className="mr-5 text-3xl text-neutral-800">{token.name}</h1>
              <span className="text-lg text-neutral-500">{token.symbol}</span>
            </div>
          </div>
        </div>

        <div className="space-y-10 text-center">
          <div className="flex space-x-10 ">
            <div>
              <p className="text-neutral-500">Total value</p>
              <p className="mt-5 text-2xl text-neutral-800">123.451 $</p>
            </div>
            <div>
              <p className="text-neutral-500">Total value</p>
              <p className="mt-5 text-2xl text-neutral-800">123.451 $</p>
            </div>
            <div>
              <p className="text-neutral-500">Total value in PLN</p>
              <p className="mt-5 text-2xl text-neutral-800">123.451 $</p>
            </div>
          </div>
          <div className="flex space-x-10">
            <div>
              <p className="text-neutral-500">Total value</p>
              <p className="mt-5 text-2xl text-neutral-800">123.451 $</p>
            </div>
            <div>
              <p className="text-neutral-500">Total value</p>
              <p className="mt-5 text-2xl text-neutral-800">123.451 $</p>
            </div>
            <div>
              <p className="text-neutral-500">Total value in PLN</p>
              <p className="mt-5 text-2xl text-neutral-800">123.451 $</p>
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
                nav.isActive ? "border-purple-800 text-purple-800" : "",
              )}
              onClick={() => onSelected(i)}
            >
              {nav.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Token;
