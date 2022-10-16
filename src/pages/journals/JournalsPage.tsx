import { JournalTabs } from '../../components/journals/JournalTabs';
import { Loading } from '../../components/loading/Loading';
import { useJournals } from '../../components/queries/JournalQueries';

export const JournalsPage = () => {
  const JournalsLoading = Loading(JournalTabs);
  const { data, error, isLoading } = useJournals();

  return <JournalsLoading isLoading={isLoading} journals={data} />;
};
