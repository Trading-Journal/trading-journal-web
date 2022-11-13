export interface BalanceModel {
  startBalance: number;
  accountBalance: number;
  closedPositions: number;
  deposits: number;
  taxes: number;
  withdrawals: number;
  openedPositions: number;
  available: number;
  startJournal: Date;
}
