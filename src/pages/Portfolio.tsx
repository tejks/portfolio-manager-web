import { useTypedSelector } from "@/common/store";
import AssetForm from "@/components/AssetForm/AssetForm";
import AssetList from "@/components/AssetList/AssetList";
import PortfolioTable from "@/components/Tables/PortfolioTable/ProftolioTable";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import React from "react";

const Portfolio: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [selectedToken, setSelectedToken] = React.useState<string | null>(null);

  const portfolioData = useTypedSelector((state) => state.portfolio.data);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedToken(null);
  };

  return (
    <main className="container mx-auto">
      <h1 className="mt-8 text-3xl font-semibold">Portfolio</h1>

      <div className="mt-16 flex justify-around">
        <div className="flex h-36 w-1/4 flex-col items-center rounded-2xl bg-gradient-to-r from-[#4a0d80] to-[#9537a8] text-neutral-300 shadow-md shadow-[#4c255069]">
          <p className="mt-4 text-xl">Total value in USD</p>
          <p className="mt-6 text-3xl font-medium">
            {portfolioData
              .reduce((acc, row) => acc + row.data.reduce((acc, row) => acc + row.amount, 0) * row.currentPrice, 0)
              .toFixed(2)}{" "}
            USD
          </p>
        </div>
        <div className="flex h-36 w-1/4 flex-col items-center rounded-2xl bg-gradient-to-r from-[#4a0d80] to-[#9537a8] text-neutral-300 shadow-md shadow-[#4c255069]">
          <p className="mt-4 text-xl">Total value in PLN</p>
          <p className="mt-6 text-3xl font-medium">
            {portfolioData
              .reduce(
                (acc, row) => acc + row.data.reduce((acc, row) => acc + row.amount, 0) * row.currentPrice * 4.2,
                0,
              )
              .toFixed(2)}{" "}
            PLN
          </p>
        </div>
        <div className="flex h-36 w-1/4 flex-col items-center rounded-2xl bg-gradient-to-r from-[#4a0d80] to-[#9537a8] text-neutral-300 shadow-md shadow-[#4c255069]">
          <p className="mt-4 text-xl">Tokens count</p>
          <p className="mt-6 text-3xl font-medium">{portfolioData.length}</p>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-between px-4 py-8">
        <h2 className="text-xl font-semibold">Your assets</h2>
        <Button
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          Add asset
        </Button>
      </div>
      <Modal hasCloseBtn={true} isOpen={isModalOpen} onClose={handleModalClose}>
        {!selectedToken ? (
          <AssetList onElementClick={(tokenAddress) => setSelectedToken(tokenAddress)} />
        ) : (
          <AssetForm selectedToken={selectedToken} onClose={handleModalClose} />
        )}
      </Modal>
      <PortfolioTable data={portfolioData} />
    </main>
  );
};

export default Portfolio;
