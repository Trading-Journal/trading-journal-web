import { Loading } from '../../components/loading/Loading';
import { JournalsTabs } from '../../containers/journals/JournalsTabs';
import { useJournalsQuery } from '../../queries';

export const JournalsPage = () => {
  const JournalsLoading = Loading(JournalsTabs);
  const { data, error, isLoading } = useJournalsQuery();

  return (
    <JournalsLoading isLoading={isLoading} error={error} journals={data} />
  );
};
