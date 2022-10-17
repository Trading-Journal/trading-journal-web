import { useQuery } from '@tanstack/react-query';
import { useAccessTokenState } from '../../context/UserContext';
import { EntryModel } from '../../model/EntryModel';
import { JournalModel } from '../../model/JournalModel';
import { getAllEntries } from '../../services/EntryService';

export const useEntries = (journal: JournalModel) => {
  const accessToken = useAccessTokenState();
  return useQuery<EntryModel[], Error>(
    [`entries-${journal.name}`],
    async () => await getAllEntries(accessToken, journal.id)
  );
};
