import { useEffect, useState } from 'react';
import { JournalTabs as journalsComponent } from '../../components/journals/JournalTabs';
import { Loading } from '../../components/loading/Loading';
import { JournalModel } from '../../model/JournalModel';

interface Load {
  loading: boolean;
  journals: JournalModel[];
}

export const JournalsPage = () => {
  const JournalsLoading = Loading(journalsComponent);

  const [appState, setAppState] = useState<Load>({
    loading: false,
    journals: [],
  });

  useEffect(() => {
    setAppState({ loading: true, journals: [] });
    // const apiUrl = `https://api.github.com/users/hacktivist123/repos`;
    const apiUrl = './data/journals.json';
    fetch(apiUrl)
      .then((res) => res.json())
      .then((journals) => {
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
