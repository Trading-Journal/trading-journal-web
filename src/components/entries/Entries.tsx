import React from 'react';
import { Journal } from '../../model/Journal';
import { Loading } from '../loading/Loading';
import { useEntriesQuery } from '../queries/EntriesQueries';
import { EntriesTable } from './EntriesTable';

export const Entries: React.FC<{ journal: Journal }> = ({ journal }) => {
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
