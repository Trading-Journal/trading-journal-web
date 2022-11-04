import { useQuery } from '@tanstack/react-query';
import { useAccessTokenState } from '../../context/UserContext';
import { BalanceModel } from '../../model/BalanceModel';
import { JournalModel } from '../../model/JournalModel';
import {
  getAllJournals,
  getJournal,
  getJournalBalance,
} from '../../services/JournalService';

export const useJournalsQuery = () => {
  const accessToken = useAccessTokenState();
  return useQuery<JournalModel[], Error>(
    ['journals'],
    async () => await getAllJournals(accessToken)
  );
};

export const useJournalQuery = (journalId: string) => {
  const accessToken = useAccessTokenState();
  return useQuery<JournalModel, Error>(
    [`journal-${journalId}`],
    async () => await getJournal(accessToken, journalId)
  );
};

export const useJournalBalanceQuery = (journalId: string) => {
  const accessToken = useAccessTokenState();
  return useQuery<BalanceModel, Error>(
    [`journal-balance-${journalId}`],
    async () => await getJournalBalance(accessToken, journalId)
  );
};
