//Imports
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Snackbar, Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from 'dayjs'; 
import AddTraining from "./addTraining";
import ExportCSV from "./ExportCSV";

// Main function 
export default function TrainingList() {
    //State variables 
    const [trainings, setTrainings] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msg, setMsg] = useState("");

     // Column definitions for the AG Grid table
    const colDefs = [
        {
            field: 'date', headerName: 'Date', filter: true, floatingFilter: true, valueFormatter: (params) => {
                if (params.value) {
                    return dayjs(params.value).format('DD.MM.YYYY HH:mm') //formatting the date
                }
            }
        },
        { field: 'duration', headerName: 'Duration (min)', filter: true, floatingFilter: true },
        { field: 'activity', headerName: 'Activity', filter: true, floatingFilter: true },
        {
            field: 'customer',
            headerName: 'Customer',
            filter: true,
            floatingFilter: true,
            valueGetter: (params) => {
                
                const customer = params.data.customer; // Gets the customer from the current row's data
                return customer ? `${customer.firstname} ${customer.lastname}` : ''; //returns customers full name if customer exist
            }
        },
        {//Delete button to delete training
            headerName: "Actions",
            cellRenderer: (params) =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteTraining(params)}
                >Delete</Button> 
        }
    ];


    useEffect(() => fetchData(), []);

    //Function to fetch training data
    const fetchData = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings', { method: 'GET' }) //Sends GET request to get training data
            .then(response => response.json())
            .then(data => {
                setTrainings(data); //sets training data
            })
            .catch(err => {
                console.error("Error fetching data:", err); //error handling
            });
    };

    // Function to delete Training 
    const deleteTraining = (params) => {

        const isConfirmed = window.confirm("Are you sure you want to delete this training?"); //Confirms deletion with the user
 
        if (isConfirmed) {
            fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${params.data.id}`, { // Sends DELETE request to delete training
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        setOpenSnackbar(true);
                        setMsg("Training deleted"); //Shows message in snackbar
                        fetchData() // Refreshes the data after delete
                    }
                    else {
                        setOpenSnackbar(false);
                    }
                })

                .catch(err => {
                });
        }
    };
    //Function to save a training
    const saveTraining = (training) => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', // Sends POST request to save training 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(training) //Converting data to JSON 
            })
            .then(res => fetchData()) //Refreshes the data after saiving a training
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
                        margin: 0, padding: 0, fontWeight: '600', color: 'black',
                        marginRight: '20px'
                    }}>Training List</h2>
                    <div style={{ display: 'flex', gap: '10px' }}>
                    <AddTraining saveTraining={saveTraining}></AddTraining> {/*AddTraining component, passing saveTraining */}
                    <ExportCSV data={trainings} filename="trainings.csv" />{/*ExportCSV component, passing filename */}
                    </div>
                </div>
                {/*AG-Grid table */}
                <div className="ag-theme-material" style={{ width: '100%', height: 500 }}>
                    <AgGridReact
                        rowData={trainings}
                        columnDefs={colDefs}
                        animateRows={true}
                    />
                </div>
            </div>
            {/*Snackbar to display messages */}
            <Snackbar
                open={openSnackbar}
                message={msg}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            />

        </>
    );

}

