//Imports
import React from 'react';
import { CSVLink } from 'react-csv';
import Button from '@mui/material/Button';

//Main function
export default function ExportCSV({ data, filename }) {
    let headers;

    // checks if the export is for customers
    if (filename === "customers.csv") {
        //Defining headers for customer data
        headers = [
            { label: 'First Name', key: 'firstname' },
            { label: 'Last Name', key: 'lastname' },
            { label: 'Street Address', key: 'streetaddress' },
            { label: 'Postcode', key: 'postcode' },
            { label: 'City', key: 'city' },
            { label: 'Email', key: 'email' },
            { label: 'Phone', key: 'phone' }
        ];
        // if export not for customers then for trainings
    } else {
        // Defining headers for training data
        headers = [
            { label: 'Date', key: 'date' },
            { label: 'Activity', key: 'activity' },
            { label: 'Duration', key: 'duration' },
            { label: 'First Name', key: 'customer.firstname' },
            { label: 'Last Name', key: 'customer.lastname' }
        ];
    }

    return (
        // Export button that starts the CSV export
        <CSVLink data={data} headers={headers} filename={filename}>
            <Button variant="contained" color="white">Export</Button>
        </CSVLink>
    );
}

