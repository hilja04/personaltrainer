import { useState } from 'react';
import { Tab, Tabs, Box, AppBar, Toolbar, Typography } from '@mui/material';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Calenderpage from './components/Calenderpage';
import './App.css';

function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      
      <AppBar position="static">
        <Toolbar>
          <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="secondary" textColor="inherit">
            <Tab label="Customers" />
            <Tab label="Trainings" />
            <Tab label="Calender"/>
          </Tabs>
        </Toolbar>
      </AppBar>

      {selectedTab === 0 && <CustomerList />}
      {selectedTab === 1 && <TrainingList />}
      {selectedTab === 2 && <Calenderpage />}
    </>
  );
}

export default App;
