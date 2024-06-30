export interface Transaction {
  id: string;
  transactionType: number;
  quantity: number;
  price: number;
  datetime: string;
  isDeleted: boolean;
  isArchived: boolean;
  userId: string;
  tokenId: string;
  brokerId: string;
}
