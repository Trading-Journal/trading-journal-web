import React, { useState } from 'react';
import { Entry } from '../../model/Entry';
import { EntryType } from '../../model/EntryType';
import { Journal } from '../../model/Journal';
import { fromEntry, Trade } from '../../model/Trade';
import { Loading } from '../loading/Loading';
import { useEntriesQuery } from '../queries';
import { SidePanel } from '../side-panel/SidePanel';
import { AddEntryDial } from './AddEntryDial';
import { DepositForm } from './DepositForm';
import { EntriesTable } from './EntriesTable';
import { EntryImages } from './EntryImages';
import { TaxesForm } from './TaxesForm';
import { TradeForm } from './TradeForm';
import { WithdrawalForm } from './WithdrawalForm';

const Form = ({
  type,
  journal,
  onClose,
  entry,
}: {
  type: EntryType;
  journal: Journal;
  onClose: () => void;
  entry?: Entry;
}) => {
  if (type === EntryType.TRADE) {
    let trade: Trade | undefined = undefined;
    if (entry) {
      trade = fromEntry(entry);
    }
    return (
      <TradeForm
        journal={journal}
        onCancel={onClose}
        onSave={onClose}
        {...(entry && { update: trade, entryId: entry.id })}
      />
    );
  } else if (type === EntryType.DEPOSIT) {
    return (
      <DepositForm journal={journal} onCancel={onClose} onSave={onClose} />
    );
  } else if (type === EntryType.WITHDRAWAL) {
    return (
      <WithdrawalForm journal={journal} onCancel={onClose} onSave={onClose} />
    );
  } else {
    return <TaxesForm journal={journal} onCancel={onClose} onSave={onClose} />;
  }
};

export const Entries: React.FC<{ journal: Journal }> = ({ journal }) => {
  const EntriesLoading = Loading(EntriesTable);
  const { data, error, isLoading } = useEntriesQuery(journal);

  const [entryOpen, setEntryOpen] = useState(false);
  const [imagesOpen, setImagesOpen] = useState(false);
  const [entry, setEntry] = useState<Entry | undefined>(undefined);
  const [type, setType] = useState<EntryType | undefined>(undefined);
  const [anchor, setAnchor] = useState<'left' | 'top' | 'right' | 'bottom'>(
    'left'
  );

  const onEdit = (entry: Entry) => {
    setEntry(entry);
    setType(entry.type);
    setAnchor('left');
    setEntryOpen(true);
  };

  const onImage = (entry: Entry) => {
    setEntry(entry);
    setImagesOpen(true);
  };

  const onClose = () => {
    setEntryOpen(false);
    setImagesOpen(false);
    setType(undefined);
  };

  const onAction = (type: EntryType) => {
    setAnchor('right');
    setEntry(undefined);
    setType(type);
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
        {type && (
          <Form
            type={type}
            journal={journal}
            onClose={onClose}
            {...(entry && { entry: entry })}
          />
        )}
      </SidePanel>

      <SidePanel open={imagesOpen} onClose={onClose}>
        <EntryImages journal={journal} entry={entry!} onCancel={onClose} />
      </SidePanel>
    </>
  );
};
