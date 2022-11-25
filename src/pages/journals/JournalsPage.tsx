import { JournalsTabs } from '../../components/journals/JournalsTabs';
import { Loading } from '../../components/loading/Loading';
import { useJournalsQuery } from '../../components/queries/JournalQueries';

export const JournalsPage = () => {
  const JournalsLoading = Loading(JournalsTabs);
  const { data, error, isLoading } = useJournalsQuery();

  return (
    <JournalsLoading isLoading={isLoading} error={error} journals={data} />
  );
};
