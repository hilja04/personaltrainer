//Imports
import { useState } from 'react';
import { Tab, Tabs, Box, AppBar, Toolbar, Typography } from '@mui/material';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Calenderpage from './components/Calenderpage';
import './App.css';

//Main App function
function App() {
  //Usestate to manage selected tab 
  const [selectedTab, setSelectedTab] = useState(0);

  //Function to handle the tab change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      {/* AppBar to create a header bar with tabs */}
      <AppBar position="static">
        <Toolbar>
          {/* Tabs component that allows switching between different views */}
          <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="secondary" textColor="inherit">
            {/* Tab labels that show on the website*/}
            <Tab label="Customers" />
            <Tab label="Trainings" />
            <Tab label="Calender" />
          </Tabs>
        </Toolbar>
      </AppBar>
      {/* Redndering the components based on the selected tab */}
      {selectedTab === 0 && <CustomerList />}
      {selectedTab === 1 && <TrainingList />}
      {selectedTab === 2 && <Calenderpage />}
    </>
  );
}

export default App;
