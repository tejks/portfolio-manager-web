import React, { useState } from "react";

import { useGetTokenQuery } from "@/common/API/services/tokens";
import { useCreateTransactionMutation, useGetBrokersQuery } from "@/common/API/services/transactions";
import { TransactionType } from "@/common/store/transactionSlice";
import { cn } from "@/common/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CircleLoader } from "react-spinners";
import { z } from "zod";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";

type TransactionFormProps = {
  selectedToken: string;
  userId: string;
  refetch: () => void;
  onClose: () => void;
};

type TransactionFormValues = {
  broker: string;
  amount: string;
  price: string;
  date: string;
};

const TransactionForm: React.FC<TransactionFormProps> = ({ selectedToken, onClose, userId, refetch }) => {
  const { data: token, isLoading } = useGetTokenQuery(selectedToken);
  const { data: brokers, isLoading: isLoadingBrokers } = useGetBrokersQuery();
  const [createTransaction] = useCreateTransactionMutation();
  const [type, setType] = useState<TransactionType>(TransactionType.BUY);

  const validationSchema = z.object({
    broker: z.string().min(1, "Broker is required"),
    amount: z.string().min(1, "Amount must be greater than 0"),
    price: z.string().min(1, "Price must be greater than 0"),
    date: z.string().min(1, "Date is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: TransactionFormValues) => {
    console.log({
      brokerId: brokers?.find((e) => e.name === data.broker),
      tokenId: selectedToken,
      datetime: data.date,
      price: Number(data.price),
      quantity: Number(data.amount),
      transactionType: type,
      userId,
    });
    try {
      await createTransaction({
        brokerId: brokers?.find((e) => e.name === data.broker)?.id as string,
        tokenId: selectedToken,
        datetime: data.date,
        price: Number(data.price),
        quantity: Number(data.amount),
        transactionType: type === TransactionType.BUY ? 0 : 1,
        userId,
      }).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
      refetch();
    }
  };

  if (isLoading || isLoadingBrokers || !token || !brokers)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <CircleLoader color="#000" />
      </div>
    );

  return (
    <div className="flex h-full flex-col justify-center px-16">
      <div className="flex flex-col items-center">
        <img src={token.logo} alt="Token logo" className="h-28 w-28 rounded-full" />
        <span className="mt-5 text-xl">{token.name}</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div className="flex w-full">
          <button
            type="button"
            className={cn(
              "flex-1 rounded-l-lg border-y-2 border-l-2 py-2.5 uppercase",
              type === TransactionType.BUY ? "border-green-700 bg-green-200 text-green-700" : "",
            )}
            onClick={() => setType(TransactionType.BUY)}
          >
            <span>Buy</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex-1 rounded-r-lg border-y-2 border-r-2 py-2.5 uppercase",
              type === TransactionType.SELL ? "border-red-700 bg-red-200 text-red-700" : "",
            )}
            onClick={() => setType(TransactionType.SELL)}
          >
            <span>Sell</span>
          </button>
        </div>

        <Input
          labelValue="Amount"
          autoComplete="off"
          type="decimal"
          error={errors["amount"]}
          register={register("amount")}
        />

        <Input
          labelValue="Price"
          autoComplete="off"
          defaultValue={token.currentPrice.toString()}
          type="decimal"
          error={errors["price"]}
          register={register("price")}
        />

        <Input labelValue="Date" autoComplete="off" type="date" error={errors["date"]} register={register("date")} />

        <Select
          options={brokers.map((e) => e.name)}
          labelValue="Broker"
          error={errors["broker"]}
          register={register("broker")}
        />

        <div className="pt-12 text-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
