import { useQuery } from '@tanstack/react-query';
import { useAccessTokenState } from '../../context/UserContext';
import { JournalModel } from '../../model/JournalModel';
import { getAllJournals, getJournal } from '../../services/JournalService';

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
