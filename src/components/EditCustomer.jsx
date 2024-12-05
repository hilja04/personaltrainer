//Imports
import { useState } from "react";
import React from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

//Main function
export default function EditCustomer({ rowData, updateCustomer }) {
    //State variables
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    });

    //Function to handle edit click
    const handleClickOpen = () => {
        console.log(rowData)
        setCustomer({
            firstname: rowData.firstname, lastname: rowData.lastname, streetaddress: rowData.streetaddress, //sets the edit fields to match the customer data
            postcode: rowData.postcode, city: rowData.city, email: rowData.email, phone: rowData.phone
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Function to handle input change whene editing
    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    };

    //Function to save a updated customer
    const saveCustomer = () => {
        updateCustomer(customer, rowData._links.customer.href);
        handleClose();
    }

    return (
        <div>
            {/* Edit button*/}
            <Button onClick={handleClickOpen}>
                Edit Customer
            </Button>
            {/* Dialog Modal for editing customer details */}
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    {/* Edit fields */}
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
                    {/* Buttons to handle save or cancel */}
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
