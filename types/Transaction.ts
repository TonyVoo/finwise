export interface Transaction {
  id?: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  note?: string;
  date: string; // ISO 8601 format
}