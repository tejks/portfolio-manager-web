import { useTypedSelector } from "@/common/store";
import AssetList from "@/components/AssetList/AssetList";
import TransactionsTable from "@/components/Tables/TransactionsTable/TransactionsTable";
import TransactionForm from "@/components/TransactionsForm/TransactionsForm";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import React, { useState } from "react";

const Transactions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  const transactionsData = useTypedSelector((state) => state.transaction.data);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedToken(null);
  };

  return (
    <main className="container mx-auto">
      <h1 className="mt-8 text-3xl font-semibold">Transactions</h1>

      <div className="mt-16 flex items-center justify-between px-4 py-8">
        <h2 className="text-xl font-semibold">Your assets</h2>
        <Button
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          Make transaction
        </Button>
      </div>
      <Modal hasCloseBtn={true} isOpen={isModalOpen} onClose={handleModalClose}>
        {!selectedToken ? (
          <AssetList onElementClick={(tokenAddress) => setSelectedToken(tokenAddress)} />
        ) : (
          <TransactionForm selectedToken={selectedToken} onClose={handleModalClose} />
        )}
      </Modal>

      <TransactionsTable data={transactionsData} />
    </main>
  );
};

export default Transactions;
