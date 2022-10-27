import { DirectionEnum } from './DirectionEnum';
import { EntryTypeEnum } from './EntryTypeEnum';
import { GraphTypeEnum } from './GraphTypeEnum';

export interface EntryModel {
  id?: string;

  date: Date;

  type: EntryTypeEnum;

  price: number;

  graphType?: GraphTypeEnum;

  graphMeasure?: string;

  symbol?: string;

  direction?: DirectionEnum;

  size?: number;

  profitPrice?: number;

  lossPrice?: number;

  costs?: number;

  exitPrice?: number;

  exitDate?: Date;

  screenshotBefore?: string;

  screenshotAfter?: string;

  notes?: string;

  accountRisked?: number;

  plannedRR?: number;

  grossResult?: number;

  netResult?: number;

  accountChange?: number;

  accountBalance?: number;
}
