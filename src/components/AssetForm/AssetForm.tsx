import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Select from "../common/Select";
import Input from "../common/Input";
import useTokenMetadata from "@/hooks/useTokenMetadata";
import { useAppDispatch } from "@/common/store";
import { addAsset } from "@/common/store/portfolioSlice";
import Button from "../common/Button";

type AssetFormProps = {
  selectedToken: string;
  onClose: () => void;
};

type AssetFormValues = {
  broker: string;
  amount: string;
  targetAmount: string;
  purchasePrice: string;
};

const brokers = ["Binance", "Coinbase", "Kraken", "Bitstamp"];

const AssetForm: React.FC<AssetFormProps> = ({ selectedToken, onClose }) => {
  const dispatch = useAppDispatch();
  const token = useTokenMetadata(selectedToken);

  const validationSchema = z.object({
    broker: z.string().min(1, "Broker is required"),
    amount: z.string().min(1, "Amount must be greater than 0"),
    targetAmount: z.string().min(1, "Target amount must be greater than 0"),
    purchasePrice: z.string().min(1, "Purchase price must be greater than 0"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssetFormValues>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = (data: AssetFormValues) => {
    try {
      dispatch(
        addAsset({
          address: selectedToken,
          broker: data.broker,
          amount: Number(data.amount),
          purchasePrice: Number(data.purchasePrice),
          currentPrice: Number((Math.random() * 200).toFixed(2)),
          targetShare: 0,
        }),
      );
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <img src={token?.logoURI} alt="Token logo" className="h-28 w-28 rounded-full" />
        <span className="mt-5 text-xl">{token?.name}</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-16 space-y-5">
        <Input
          labelValue="Amount"
          autoComplete="off"
          type="decimal"
          error={errors["amount"]}
          register={register("amount")}
        />
        <Input
          labelValue="Target amount"
          autoComplete="off"
          type="decimal"
          error={errors["targetAmount"]}
          register={register("targetAmount")}
        />
        <Input
          labelValue="Purchase price"
          autoComplete="off"
          type="decimal"
          error={errors["purchasePrice"]}
          register={register("purchasePrice")}
        />
        <Select options={brokers} labelValue="Broker" error={errors["broker"]} register={register("broker")} />

        <div className="pt-12 text-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default AssetForm;
