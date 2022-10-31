import React from 'react';
import { JournalModel } from '../../model/JournalModel';
import { Loading } from '../loading/Loading';
import { useEntriesQuery } from '../queries/EntriesQueries';
import { EntriesTable } from './EntriesTable';

export const Entries: React.FC<{ journal: JournalModel }> = ({ journal }) => {
  const EntriesLoading = Loading(EntriesTable);

  const { data, error, isLoading } = useEntriesQuery(journal);

  return (
    <EntriesLoading
      isLoading={isLoading}
      error={error}
      entries={data}
      journal={journal}
    />
  );
};
