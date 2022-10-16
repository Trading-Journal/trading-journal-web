import { useQuery } from '@tanstack/react-query';
import { useAccessTokenState } from '../../context/UserContext';
import { getAllJournals } from '../../services/JournalService';

export const useJournals = () => {
  const accessToken = useAccessTokenState();
  return useQuery(['journals'], async () => await getAllJournals(accessToken));
};
