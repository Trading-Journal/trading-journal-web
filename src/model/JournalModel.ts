import { BalanceModel } from './BalanceModel';

export interface JournalModel {
  id: string;
  name: string;
  startBalance: number;
  currentBalance: BalanceModel;
  lastBalance: Date;
}
