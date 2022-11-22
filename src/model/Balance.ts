import { Currency } from './Currency';

export interface Balance {
  startBalance: number;
  accountBalance: number;
  closedPositions: number;
  deposits: number;
  taxes: number;
  withdrawals: number;
  openedPositions: number;
  available: number;
  startJournal: Date;
  currency: Currency;
}
