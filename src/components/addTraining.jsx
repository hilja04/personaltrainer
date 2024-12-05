//Imports
import { useState, useEffect } from "react";
import React from "react";
import { Button, Snackbar, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Autocomplete, } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// Main function
export default function AddTraining({ saveTraining }) {  // saveTraining passed from TrainingList

    // State variables
    const [openSnackbar, setOpenSnackbar] = useState(false); //Controls the visibility of the snackbar
    const [msg, setMsg] = useState(""); // message shown in the snackbar
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: null, duration: '', activity: '', customer: null
    });
    const [customers, setCustomers] = useState([]);

    //Fetching customer data for adding training to customer
    useEffect(() => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers') //fetching customer data 
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error("Error fetching customers:", err));
    }, []);

    //Handling the add click
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Function to handle Input change when adding
    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    };

    //Function to handle date change
    const handleDateChange = (newDate) => {
        setTraining({ ...training, date: newDate ? newDate.toISOString() : null }); //Converts date to ISO format
    };

    //Function to handle customer change
    const handleCustomerChange = (event, newValue) => {
        setTraining({ ...training, customer: newValue?._links.self.href || null }); //Sets the customer link for the training
    };

    //Function to handle adding a training
    const addTraining = () => {
        saveTraining(training);
        setOpenSnackbar(true);
        setMsg("Training added");
        handleClose();
    };

    return (
        <div>
            {/*Add training button */}
            <Button variant="contained" onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    {/*Field for the date when adding*/}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            value={training.date ? dayjs(training.date) : null}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                            label="Training Date and Time"
                        />
                    </LocalizationProvider>
                    {/*Fields for add training*/}
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={handleInputChange}
                        label="Duration (minutes)"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={handleInputChange}
                        label="Activity"
                        fullWidth
                    />
                    {/* Autocomplete input for selecting a customer, displays their first and last name, 
                    and stores the selected customer's link in the training object */}
                    <Autocomplete
                        value={customers.find(c => c._links.self.href === training.customer) || null}
                        onChange={handleCustomerChange}
                        options={customers}
                        getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
                        renderInput={(params) => <TextField {...params} label="Customer" fullWidth />}
                    />
                </DialogContent>
                <DialogActions>
                    {/*Buttons to handle Cancel or Save */}
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
            {/*Snackbar to display messages */}
            <Snackbar
                open={openSnackbar}
                message={msg}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            />
        </div>
    );
}
