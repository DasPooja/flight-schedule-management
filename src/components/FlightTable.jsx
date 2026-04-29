import { useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import { FiTrash2 } from "react-icons/fi";
import { Checkbox, Dialog, DialogTitle, DialogActions, Button, Tooltip } from '@mui/material';
import toast from 'react-hot-toast';
import FlightRow from './FlightRow';

const FlightTable = ({  
    flights = [],
    setFlights,
    selected = [],
    setSelected,
    toggleSelect,
}) => {
    const [open, setOpen] = useState(false);
    const [deleteIds, setDeleteIds] = useState([]);

    const allIds = flights.map(f => f.id);
    
    const isAllSelected = flights.length > 0 && selected.length === flights.length;

    const isIndeterminate = selected.length > 0 && selected.length < flights.length;

    const handleSelectAll = (e) => {
        const checked = e.target.checked;

        if (checked) {
            setSelected(allIds);   // SIMPLE + RELIABLE
        } else {
            setSelected([]);       // CLEAR ALL
        }
    };

    // OPEN DELETE FOR MULTIPLE
    const handleBulkDeleteClick = () => {
        setDeleteIds(selected);
        setOpen(true);
    };

    // OPEN DELETE FOR SINGLE
    const handleSingleDeleteClick = (id) => {
        setDeleteIds([id]);
        setOpen(true);
    };

    const handleDelete = () => {
        const updated = flights.filter(f => !deleteIds.includes(f.id));
        
        setFlights(updated);
        setSelected([]);     // RESET SELECTION COMPLETELY
        setDeleteIds([]);
        setOpen(false);      // CLOSE MODAL FIRST

        setTimeout(() => {
            toast.success("Deleted successfully");
        }, 0);
    };

    if (!flights.length) {
        return <div className="p-4">No flights available</div>;
    }

    return (
        <div className="bg-white rounded-md border border-gray-300 overflow-hidden">
            {selected.length > 0 && (
                <div className="flex justify-between items-center p-3  bg-blue-50 border-b border-b-gray-300">
                    {/* LEFT: selected count */}
                    <div className="font-medium text-gray-700 ml-8">
                        {selected.length} selected
                    </div>
                    {/* RIGHT: delete button */}
                    <Tooltip title="Delete" arrow>
                        <Button onClick={handleBulkDeleteClick} > <FiTrash2 className='text-red-600 text-xl' /> </Button>
                    </Tooltip>
                </div>
            )}

            {/* HEADER */}
            <div className="grid grid-cols-6 md:grid-cols-9 lg:grid-cols-13 bg-blue-50 items-center text-sm font-semibold p-3 border-b border-b-gray-300 sticky top-0 z-10">
                <div className='text-center'>
                    {/* SELECT ALL */}
                    <Checkbox
                        checked={isAllSelected}
                        indeterminate={isIndeterminate}
                        onChange={handleSelectAll}
                        
                    />
                </div>
                {/* <div>Sl No</div> */}
                <div className="text-center">Flight</div>
                <div className="text-center hidden md:block">AOC</div>
                <div className="text-center">Route</div>
                <div className="text-center">Departure</div>
                <div className="text-center hidden sm:block">Arrival</div>
                <div className="text-center hidden md:block">Start Date</div>
                <div className="text-center hidden md:block">End Date</div>
                <div className="text-center hidden lg:block">Body Type</div>
                <div className="text-center hidden lg:block">Days</div>
                <div className="text-center">Status</div>
                <div className="text-center">Actions</div>
            </div>
            <div className="h-125 overflow-auto">
                <List
                    height={500}
                    itemCount={flights.length || 0}
                    itemSize={50}
                    width={"100%"}
                >
                    {({ index, style }) => (
                        <div style={style}>
                            <FlightRow
                                flight={flights[index]}
                                index={index}
                                flights={flights}
                                setFlights={setFlights}
                                selected={selected}
                                toggleSelect={toggleSelect}
                                onDelete={handleSingleDeleteClick}
                            />
                        </div>
                    )}
                </List>
            </div>
            {/* DELETE CONFIRMATION REUSABLE DIALOG */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Do you want to delete {deleteIds.length > 1 ? "selected flights" : "this flight"}?</DialogTitle>
                <DialogActions>
                <Button onClick={() => setOpen(false)}>No</Button>
                <Button color="error" variant="contained" onClick={handleDelete}>
                    Yes
                </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default FlightTable;