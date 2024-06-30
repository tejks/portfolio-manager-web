import { useGetTransactionsWithUserIdQuery } from "@/common/API/services/transactions";
import { useTypedSelector } from "@/common/store";
import { selectCurrentUser } from "@/common/store/authSlice";
import AssetList from "@/components/AssetList/AssetList";
import TransactionsTable from "@/components/Tables/TransactionsTable/TransactionsTable";
import TransactionForm from "@/components/TransactionsForm/TransactionsForm";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import React, { useState } from "react";
import { CircleLoader } from "react-spinners";

const Transactions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  const user = useTypedSelector(selectCurrentUser);

  const {
    data: transactions,
    isLoading,
    refetch,
  } = useGetTransactionsWithUserIdQuery(user?.id as string, {
    refetchOnMountOrArgChange: true,
  });

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedToken(null);
  };

  return (
    <main className="container mx-auto">
      <h1 className="mt-8 text-3xl font-semibold">Transactions</h1>

      {!user ? (
        <div className="mt-80 text-center text-xl">You need to login</div>
      ) : (
        <>
          <div className="mt-16 flex items-center justify-between px-4 py-8">
            <h2 className="text-xl font-semibold">Your transactions</h2>
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
              <TransactionForm
                selectedToken={selectedToken}
                onClose={handleModalClose}
                userId={user.id}
                refetch={refetch}
              />
            )}
          </Modal>

          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <CircleLoader color="#000" />
            </div>
          ) : !transactions ? (
            <p className="mt-72 text-center text-xl text-neutral-500">Not found transactions</p>
          ) : (
            <TransactionsTable data={transactions} />
          )}
        </>
      )}
    </main>
  );
};

export default Transactions;
