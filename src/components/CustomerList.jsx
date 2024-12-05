//imports
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Snackbar, Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import ExportCSV from "./ExportCSV";

//Main function
export default function CustomerList() {
    //State variables 
    const [customers, setCustomers] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msg, setMsg] = useState("");

    // Column definitions for the AG Grid table
    const colDefs = [
        { field: 'firstname', headerName: 'First Name', filter: true, floatingFilter: true },
        { field: 'lastname', headerName: 'Last Name', filter: true, floatingFilter: true },
        { field: 'streetaddress', headerName: 'Street Address', filter: true, floatingFilter: true },
        { field: 'postcode', headerName: 'Postcode', filter: true, floatingFilter: true },
        { field: 'city', headerName: 'City', filter: true, floatingFilter: true },
        { field: 'email', headerName: 'Email', filter: true, floatingFilter: true },
        { field: 'phone', headerName: 'Phone', filter: true, floatingFilter: true },
        {  // Edit button 
            headerName: "Edit",
            cellRenderer: (params) => <EditCustomer rowData={params.data} updateCustomer={updateCustomer} /> // Rendes editCustomer, passes rowData and update function to EditCustomer component
        },
        {// Button for deleting a customer
            headerName: "Delete", 
            cellRenderer: (params) =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteCustomer(params)}
                >Delete</Button>

        }
    ];

    //Function to update customer data
    const updateCustomer = (customer, link) => { //Sends a PUT request to update customer data
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchData()) // Refreshes the customer list after update
            .catch(err => console.error(err))
    }

    //Function to delete a customer 
    const deleteCustomer = (params) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this customer?"); // Confirms deletion with the user

        if (isConfirmed) {
            fetch(params.data._links.customer.href, { method: 'DELETE' }) // Sends DELETE request to delete customer
                .then(response => {
                    if (response.ok) { // Checks if the deletion was successful
                        setMsg("Customer deleted");// Sets success message
                        setOpenSnackbar(true);// Opens Snackbar to display success message
                        fetchData();// Refreshes the customer list after deletion
                    } else {
                        setOpenSnackbar(false); 
                        setMsg("Delete failed");
                    }
                })
                .catch(err => {
                    // Handles error during delete
                    setOpenSnackbar(false);
                    setMsg("An error occurred while deleting.");
                });
        }
    };

    useEffect(() => fetchData(), []);

    //Function to fetch customer data from API
    const fetchData = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', { method: 'GET' })// Sends GET request to fetch customer data
            .then(response => response.json())
            .then(data => {
                setCustomers(data._embedded.customers); //Sets customer data
            })
            .catch(err => {
                console.error("Error fetching data:", err); //Handling any error while fetching data
            });
    };

    //Function to save a new customer
    const saveCustomer = (customer) => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', //Sends POST request to add new customer
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' //Content type is JSON
                },
                body: JSON.stringify(customer)
            })
            .then(res => fetchData()) //Refreshes the customer list after saving a new customer
            .catch(err => console.error(err))
    }
    return (
        <>

            <div style={{
                backgroundColor: "white", padding: "20px",
                width: '90%', margin: '40px auto', minWidth: '1100px', height: 'auto'
            }}>

                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'
                }}>
                    <h2 style={{
                        margin: 0, padding: 0, fontWeight: '600', color: 'black'
                    }}>Customer List</h2>

                    <div style={{ display: 'flex', gap: '10px' }}> 
                        <AddCustomer saveCustomer={saveCustomer} /> {/* AddCustomer component, passing saveCustomer*/}
                        <ExportCSV data={customers} filename="customers.csv" /> {/* ExportCSV component, passing filename */}
                    </div>
                </div>
                {/*AG-Grid table */}
                <div className="ag-theme-material" style={{ width: '100%', height: 500 }}>
                    <AgGridReact
                        rowData={customers}
                        columnDefs={colDefs}
                        animateRows={true}
                    />
                </div>
            </div>

            {/* Snackbar to display messages */}
            <Snackbar
                open={openSnackbar}
                message={msg}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            />
        </>
    );
}

