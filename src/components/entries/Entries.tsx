import React, { useState } from 'react';
import { Entry } from '../../model/Entry';
import { EntryType } from '../../model/EntryType';
import { Journal } from '../../model/Journal';
import { fromEntry, Trade } from '../../model/Trade';
import { Loading } from '../loading/Loading';
import { useEntriesQuery } from '../queries/EntriesQueries';
import { SidePanel } from '../side-panel/SidePanel';
import { AddEntryDial } from './AddEntryDial';
import { DepositForm } from './DepositForm';
import { EntriesTable } from './EntriesTable';
import { EntryImages } from './EntryImages';
import { TradeForm } from './TradeForm';

const Form = ({
  type,
  journal,
  onClose,
  update,
}: {
  type: EntryType;
  journal: Journal;
  onClose: () => void;
  update?: Entry;
}) => {
  if (type === EntryType.TRADE) {
    let updateTrade: Trade | undefined = undefined;
    if (update) {
      updateTrade = fromEntry(update);
    }
    return (
      <TradeForm
        journal={journal}
        onCancel={onClose}
        onSave={onClose}
        {...(update && { update: updateTrade, entryId: update.id })}
      />
    );
  } else if (type === EntryType.DEPOSIT) {
    return (
      <DepositForm journal={journal} onCancel={onClose} onSave={onClose} />
    );
  } else {
    return <h3>Invalid</h3>;
  }
};

export const Entries: React.FC<{ journal: Journal }> = ({ journal }) => {
  const EntriesLoading = Loading(EntriesTable);
  const { data, error, isLoading } = useEntriesQuery(journal);

  const [entryOpen, setEntryOpen] = useState(false);
  const [imagesOpen, setImagesOpen] = useState(false);
  const [entry, setEntry] = useState<Entry | undefined>(undefined);
  const [action, setAction] = useState<EntryType | undefined>(undefined);
  const [anchor, setAnchor] = useState<'left' | 'top' | 'right' | 'bottom'>(
    'left'
  );

  const onEdit = (entry: Entry) => {
    setAction(entry.type);
    setAnchor('left');
    setEntry(entry);
    setEntryOpen(true);
  };

  const onImage = (entry: Entry) => {
    setEntry(entry);
    setImagesOpen(true);
  };

  const onClose = () => {
    setEntryOpen(false);
    setImagesOpen(false);
  };

  const onAction = (type: EntryType) => {
    setAnchor('right');
    setEntry(undefined);
    setAction(type);
    setEntryOpen(true);
  };

  return (
    <>
      <EntriesLoading
        isLoading={isLoading}
        error={error}
        entries={data}
        journal={journal}
        onEdit={onEdit}
        onImage={onImage}
      />
      <AddEntryDial onSelect={onAction} />

      <SidePanel anchor={anchor} open={entryOpen} onClose={onClose}>
        {action && (
          <Form
            type={action}
            journal={journal}
            onClose={onClose}
            {...(entry && { update: entry })}
          />
        )}
      </SidePanel>

      <SidePanel open={imagesOpen} onClose={onClose}>
        <EntryImages journal={journal} entry={entry!} onCancel={onClose} />
      </SidePanel>
    </>
  );
};
