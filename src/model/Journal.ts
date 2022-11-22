import { Balance } from './Balance';
import { Currency } from './Currency';

export interface Journal extends JournalRequest {
  id: string;
  currentBalance: Balance;
  lastBalance: Date;
}

export interface JournalRequest {
  id?: string;
  name: string;
  startJournal: Date;
  startBalance: number;
  currency: Currency;
}
