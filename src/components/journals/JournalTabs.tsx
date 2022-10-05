import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { JournalModel } from '../../model/JournalModel';
import { SingleJournal } from './SingleJournal';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box
          sx={{
            p: 3,
            flexGrow: 1,
            bgcolor: 'background.paper',
            display: 'flex',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

export const JournalTabs = (props: any) => {
  const [value, setValue] = React.useState(0);
  const [journals, setJournals] = useState<JournalModel[]>([]);

  useEffect(() => {
    if (props.journals != null && props.journals.length > 0) {
      setJournals(props.journals);
    }
  }, [props]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        orientation="vertical"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {journals.map((journal: JournalModel, index: number) => (
          <Tab key={`journal-item-${journal.id}`} label={journal.name} />
        ))}
      </Tabs>
      {journals.map((journal: JournalModel, index: number) => (
        <TabPanel
          key={`journal-tab-panel-${journal.id}`}
          value={value}
          index={index}
        >
          <SingleJournal journal={journal} />
        </TabPanel>
      ))}
    </Box>
  );
};
