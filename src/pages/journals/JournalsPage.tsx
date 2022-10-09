import { useEffect, useState } from 'react';
import { JournalTabs } from '../../components/journals/JournalTabs';
import { Loading } from '../../components/loading/Loading';
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

  useEffect(() => {
    setAppState({ loading: true, journals: [] });
    getAllJournals().then((journals) => {
      setAppState({ loading: false, journals });
    });
  }, [setAppState]);
  return (
    <JournalsLoading
      isLoading={appState.loading}
      journals={appState.journals}
    />
  );
};
