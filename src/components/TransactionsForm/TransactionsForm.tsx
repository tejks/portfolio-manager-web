import React, { useState } from "react";

import { useAppDispatch } from "@/common/store";
import { TransactionType, addTransaction } from "@/common/store/transactionSlice";
import { cn } from "@/common/utils/cn";
import useTokenMetadata from "@/hooks/useTokenMetadata";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";

type TransactionFormProps = {
  selectedToken: string;
  onClose: () => void;
};

type TransactionFormValues = {
  broker: string;
  amount: string;
  price: string;
  date: string;
};

const brokers = ["Binance", "Coinbase", "Kraken", "Bitstamp"];

const TransactionForm: React.FC<TransactionFormProps> = ({ selectedToken, onClose }) => {
  const dispatch = useAppDispatch();
  const token = useTokenMetadata(selectedToken);
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

  const onSubmit = (data: TransactionFormValues) => {
    try {
      dispatch(
        addTransaction({
          address: selectedToken,
          broker: data.broker,
          amount: Number(data.amount),
          date: new Date(data.date).toLocaleDateString(),
          price: Number(data.price),
          type,
          id: Date.now(),
        }),
      );
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="flex h-full flex-col justify-center px-16">
      <div className="flex flex-col items-center">
        <img src={token?.logoURI} alt="Token logo" className="h-28 w-28 rounded-full" />
        <span className="mt-5 text-xl">{token?.name}</span>
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
          type="decimal"
          error={errors["price"]}
          register={register("price")}
        />

        <Input labelValue="Date" autoComplete="off" type="date" error={errors["date"]} register={register("date")} />

        <Select options={brokers} labelValue="Broker" error={errors["broker"]} register={register("broker")} />

        <div className="pt-12 text-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
