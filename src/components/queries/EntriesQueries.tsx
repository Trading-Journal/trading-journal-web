import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAccessTokenState } from '../../context/UserContext';
import { EntryModel } from '../../model/EntryModel';
import { JournalModel } from '../../model/JournalModel';
import {
  deleteEntry,
  getAllEntries,
  saveEntry,
} from '../../services/EntryService';

export const useEntriesQuery = (journal: JournalModel) => {
  const accessToken = useAccessTokenState();
  return useQuery<EntryModel[], Error>(
    [`entries-${journal.id}`],
    async () => await getAllEntries(accessToken, journal.id)
  );
};

export const useEntrySave = (journalId: string) => {
  const queryClient = useQueryClient();
  const accessToken = useAccessTokenState();
  return useMutation(
    (entry: EntryModel) => saveEntry(accessToken, journalId, entry),
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
    (entry: EntryModel) => deleteEntry(accessToken, journalId, entry),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`journal-balance-${journalId}`]);
        queryClient.invalidateQueries([`entries-${journalId}`]);
      },
    }
  );
};
