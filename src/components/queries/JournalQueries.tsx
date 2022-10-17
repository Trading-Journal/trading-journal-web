import { useQuery } from '@tanstack/react-query';
import { useAccessTokenState } from '../../context/UserContext';
import { JournalModel } from '../../model/JournalModel';
import { getAllJournals } from '../../services/JournalService';

export const useJournals = () => {
  const accessToken = useAccessTokenState();
  return useQuery<JournalModel[], Error>(
    ['journals'],
    async () => await getAllJournals(accessToken)
  );
};
