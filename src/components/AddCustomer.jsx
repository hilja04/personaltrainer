//Imports
import { useState } from "react";
import React from "react";
import { Button, Snackbar, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

//Main function
export default function AddCustomer({saveCustomer}) { // saveCustomer passed from CustomerList
    const [openSnackbar, setOpenSnackbar] = useState(false); //Controls the visibility of the snackbar
    const [msg, setMsg] = useState(""); // message shown in the snackbar
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    });

    // Handles the add open click 
    const handleClickOpen = () => {
        setOpen(true);
    };
    //Handles the add close click
    const handleClose = () => {
        setOpen(false);
    };

    //Handles input change 
    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    };
    // Function to handle adding a customer
    const addCustomer = () => {
        saveCustomer(customer); // saveCustomer prop
        setOpenSnackbar(true);
        setMsg("Customer added");
        handleClose();
    }

    return (
        <div>
            {/* Button to add a customer */}
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Customer
            </Button>
            {/* Dialog for the adding */}
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>New Customer</DialogTitle>
                <DialogContent>
                    {/* Fields for the data when adding */}
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        onChange={e => handleInputChange(e)}  
                        label="Firstname"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        onChange={e => handleInputChange(e)}  
                        label="Lastname"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={e => handleInputChange(e)}  
                        label="Street Address"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        onChange={e => handleInputChange(e)}  
                        label="Postcode"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        value={customer.city}
                        onChange={e => handleInputChange(e)}  
                        label="City"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        value={customer.email}
                        onChange={e => handleInputChange(e)}
                        label="Email"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        onChange={e => handleInputChange(e)}  
                        label="Phone"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    {/* Buttons to handle Cancel and Save */}
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addCustomer}>Save</Button> 
                </DialogActions>
            </Dialog>
            {/* Snackbar to display messages*/}
            <Snackbar
                open={openSnackbar}
                message={msg}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            />

        </div>
    );
}
