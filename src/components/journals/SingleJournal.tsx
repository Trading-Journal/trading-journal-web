import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { JournalModel } from '../../model/JournalModel';

export const SingleJournal = (props: any) => {
  const [journal, setJournal] = useState<JournalModel>();

  useEffect(() => {
    setJournal(props.journal);
  }, [props]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
      }}
    >
      <div>
        <ul>
          <li>Name: {journal?.name}</li>
          <li>Start Balance: {journal?.startBalance}</li>
          <li>Name: {journal?.name}</li>
          <li>
            Balance:
            <ul>
              <li>Balance: {journal?.currentBalance?.accountBalance}</li>
              <li>Deposits: {journal?.currentBalance?.deposits}</li>
            </ul>
          </li>
        </ul>
      </div>
    </Box>
  );
};
