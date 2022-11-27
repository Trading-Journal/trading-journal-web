import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAccessTokenState } from 'context/UserContext';
import {
  deleteJournal,
  getAllJournals,
  getJournal,
  getJournalBalance,
  saveJournal,
} from 'services';
import { Balance, Journal, JournalRequest } from '../model';

export const useJournalsQuery = () => {
  const accessToken = useAccessTokenState();
  return useQuery<Journal[], Error>(
    ['journals'],
    async () => await getAllJournals(accessToken)
  );
};

export const useJournalQuery = (journalId: string) => {
  const accessToken = useAccessTokenState();
  return useQuery<Journal, Error>(
    [`journal-${journalId}`],
    async () => await getJournal(accessToken, journalId)
  );
};

export const useJournalBalanceQuery = (journalId: string) => {
  const accessToken = useAccessTokenState();
  return useQuery<Balance, Error>(
    [`journal-balance-${journalId}`],
    async () => await getJournalBalance(accessToken, journalId)
  );
};

export const useJournalSave = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation(
    (journal: JournalRequest) => saveJournal(accessToken, journal),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['journals']);
      },
    }
  );
};

export const useJournalDelete = () => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation(
    (journalId: string) => deleteJournal(accessToken, journalId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['journals']);
      },
    }
  );
};
