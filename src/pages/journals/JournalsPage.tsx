import { JournalTabs } from '../../components/journals/JournalTabs';
import { Loading } from '../../components/loading/Loading';
import { useJournalsQuery } from '../../components/queries/JournalQueries';

export const JournalsPage = () => {
  const JournalsLoading = Loading(JournalTabs);
  const { data, error, isLoading } = useJournalsQuery();

  return (
    <JournalsLoading isLoading={isLoading} error={error} journals={data} />
  );
};
