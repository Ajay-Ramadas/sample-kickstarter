import { FormatListNumberedOutlined, InsertDriveFileOutlined } from '@mui/icons-material';
import { Box, Tab, Tabs, ThemeProvider } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import './app.scss';
import KickstarterForm from './pages/kickstarter-form/kickstarter-form.page';
import Listing from './pages/listing/listing.page';
import Header from './shared/Components/header/header.component';
import { Flow } from './shared/Models/flow.model';
import { customTheme } from './shared/Models/palette';
import Emitter from './shared/Services/events.service';

function tabprops(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

function App() {
  const [tab, setTab] = React.useState(0);
  const [kickstarter, setKickstarter] = React.useState(<KickstarterForm />);

  useEffect(() => {
    Emitter.on('CHANGE_TAB', (tab: number) => {
      setTab(tab);
      if (tab === 0) {
        Emitter.emit('REFRESH');
      }
    });
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const navigateToForm = (source: Flow, destination: Flow, component?: Flow) => {
    handleChange(null, 1);
    setKickstarter(
      <KickstarterForm source={source} destination={destination} component={component} />
    );
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Header />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'primary', mb: 5 }}>
          <Tabs
            value={tab}
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleChange}
            sx={{ width: '100%' }}
          >
            <Tab
              icon={<FormatListNumberedOutlined />}
              iconPosition="start"
              label="Templates"
              {...tabprops(0)}
              sx={{ backgroundColor: 'white', width: '50%', maxWidth: 'unset' }}
            />
            <Tab
              icon={<InsertDriveFileOutlined />}
              iconPosition="start"
              label="Kickstarter Form"
              {...tabprops(1)}
              sx={{ backgroundColor: 'white', width: '50%', maxWidth: 'unset' }}
            />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <Listing stateHandler={navigateToForm} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          {kickstarter}
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}

export default App;
