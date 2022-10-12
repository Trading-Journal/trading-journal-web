import { useEffect, useState } from 'react';
import { JournalTabs } from '../../components/journals/JournalTabs';
import { Loading } from '../../components/loading/Loading';
import { useAccessTokenState } from '../../context/UserContext';
import { JournalModel } from '../../model/JournalModel';
import { getAllJournals } from '../../services/JournalService';

interface Load {
  loading: boolean;
  journals: JournalModel[];
}

export const JournalsPage = () => {
  const JournalsLoading = Loading(JournalTabs);

  const [appState, setAppState] = useState<Load>({
    loading: false,
    journals: [],
  });

  const accessToken = useAccessTokenState();

  useEffect(() => {
    setAppState({ loading: true, journals: [] });
    getAllJournals(accessToken).then((journals) => {
      setAppState({ loading: false, journals });
    });
  }, [setAppState, accessToken]);
  return (
    <JournalsLoading
      isLoading={appState.loading}
      journals={appState.journals}
    />
  );
};
