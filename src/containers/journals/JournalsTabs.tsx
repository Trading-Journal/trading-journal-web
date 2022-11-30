import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Journal } from 'model';
import { useJournalsQuery } from 'queries';
import React, { useEffect, useState } from 'react';
import { JournalEntries } from './JournalEntries';
import { Journals } from './Journals';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

export const JournalsTabs = () => {
  const { data: journals } = useJournalsQuery();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (journals && journals.length > 0) {
      setValue(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab icon={<TuneIcon sx={{ fontSize: 30 }} />} />
          {journals &&
            journals.map((journal: Journal) => (
              <Tab
                key={`journal-item-${journal.id}`}
                label={journal.name}
                iconPosition="end"
              />
            ))}
        </Tabs>
      </Box>
      <TabPanel key={'journal-tab-panel-options'} value={value} index={0}>
        <Journals />
      </TabPanel>
      {journals &&
        journals.map((journal: Journal, index: number) => (
          <TabPanel
            key={`journal-tab-panel-${journal.id}`}
            value={value}
            index={index + 1}
          >
            <JournalEntries journalId={journal.id} />
          </TabPanel>
        ))}
    </Box>
  );
};
