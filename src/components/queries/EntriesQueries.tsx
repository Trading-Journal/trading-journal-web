import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAccessTokenState } from '../../context/UserContext';
import { Deposit } from '../../model/Deposit';
import { Entry } from '../../model/Entry';
import { Journal } from '../../model/Journal';
import { Taxes } from '../../model/Taxes';
import { Withdrawal } from '../../model/Withdrawal';
import {
  deleteEntry,
  getAllEntries,
  saveDeposit,
  saveTaxes,
  saveTrade,
  saveWithdrawal,
} from '../../services/EntryService';

export const useEntriesQuery = (journal: Journal) => {
  const accessToken = useAccessTokenState();
  return useQuery<Entry[], Error>(
    [`entries-${journal.id}`],
    async () => await getAllEntries(accessToken, journal.id)
  );
};

export const useEntrySave = (journalId: string) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation(
    (entry: Entry) => saveTrade(accessToken, journalId, entry),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`journal-balance-${journalId}`]);
        queryClient.invalidateQueries([`entries-${journalId}`]);
      },
    }
  );
};

export const useSaveWithdrawal = (journalId: string) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation(
    (withdrawal: Withdrawal) =>
      saveWithdrawal(accessToken, journalId, withdrawal),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`journal-balance-${journalId}`]);
        queryClient.invalidateQueries([`entries-${journalId}`]);
      },
    }
  );
};

export const useSaveDeposit = (journalId: string) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation(
    (deposit: Deposit) => saveDeposit(accessToken, journalId, deposit),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`journal-balance-${journalId}`]);
        queryClient.invalidateQueries([`entries-${journalId}`]);
      },
    }
  );
};

export const useSaveTaxes = (journalId: string) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation(
    (taxes: Taxes) => saveTaxes(accessToken, journalId, taxes),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`journal-balance-${journalId}`]);
        queryClient.invalidateQueries([`entries-${journalId}`]);
      },
    }
  );
};

export const useEntryDelete = (journalId: string) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation(
    (entry: Entry) => deleteEntry(accessToken, journalId, entry),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`journal-balance-${journalId}`]);
        queryClient.invalidateQueries([`entries-${journalId}`]);
      },
    }
  );
};
