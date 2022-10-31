import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useEffect, useState } from 'react';
import { JournalModel } from '../../model/JournalModel';
import { JournalEntries } from './JournalEntries';

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

export const JournalTabs: React.FC<{ journals: JournalModel[] }> = ({
  journals,
}) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (journals.length > 0) {
      setValue(1);
    }
  }, [journals]);

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
          {journals.map((journal: JournalModel) => (
            <Tab
              key={`journal-item-${journal.id}`}
              label={journal.name}
              iconPosition="end"
            />
          ))}
        </Tabs>
      </Box>
      {journals.map((journal: JournalModel, index: number) => (
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
