import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { Checkbox, Switch, Button, TextField, Tooltip } from "@mui/material";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const FlightRow = ({ 
    flight,
    index,
    flights,
    setFlights,
    selected,
    toggleSelect,
    onDelete
}) => {
    const [editMode, setEditMode] = useState(false);
    const [local, setLocal] = useState(flight);
    const [loading, setLoading] = useState(false);

    const dayMap = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

    const fullDays = flight.daysOfOperation ?.map(d => dayMap[d - 1]).join(", ");

    const handleSave = () => {
        setLoading(true);

        setTimeout(() => {
        const success = Math.random() > 0.2;

        if (!success) {
            toast.error("Save failed");
            setLocal(flight);
            setLoading(false);
            return;
        }

        const updated = [...flights];
        updated[index] = local;
        setFlights(updated);

        toast.success("Saved");
        setEditMode(false);
        setLoading(false);
        }, 800);
    };

    const toggleStatus = () => {
        const updated = [...flights];
        updated[index].status =
        flight.status === "Active" ? "Inactive" : "Active";
        setFlights(updated);
    };

    // use parent delete function to remove this flight from flights array in parent component
    const handleDelete = () => {
        onDelete(flight.id);
    };

    return (
        <div className="grid grid-cols-6 md:grid-cols-9 lg:grid-cols-13 items-center justify-center p-1 border-b border-b-gray-300 text-sm hover:bg-gray-50">
            <div className="text-center ml-4">
                <Checkbox
                    checked={selected.includes(flight.id)}
                    onChange={() => toggleSelect(flight.id)}
                />
            </div>

            {/* SL NO */}
            {/* <div>{index + 1}</div> */}

            {/* FLIGHT */}
            <div className="text-center">{flight.flightNumber}</div>

            {/* AOC */}
            <div className="text-center hidden md:block">{flight.aoc}</div>

            {/* ROUTE */}
            <div className="text-center">
                <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 text-xs  sm:px-2 sm:py-1 sm:text-sm rounded-md font-medium">
                    {flight.origin}
                </span>
                <span className="mx-0.5 sm:mx-1 text-gray-400 text-xs sm:text-sm">→</span>
                <span className="bg-green-50 text-green-700  px-1.5 py-0.5 text-xs sm:px-2 sm:py-1 sm:text-sm rounded-md font-medium">
                    {flight.destination}
                </span>
            </div>
            {/* STD */}
            {editMode ? (
                <TextField
                    type="time"
                    size="small"
                    value={local.std || ""}
                    onChange={(e) =>
                        setLocal({ ...local, std: e.target.value })
                    }
                    inputProps={{ step: 60 }} // minutes only
                />
            ) : (
                    <div className="text-center">{flight.std || "--:--"}</div>
                )
            }

            {/* STA */}
            {editMode ? (
                <TextField
                    type="time"
                    size="small"
                    value={local.sta || ""}
                    onChange={(e) =>
                        setLocal({ ...local, sta: e.target.value })
                    }
                    inputProps={{ step: 60 }} // minutes only
                    />
                ) : (
                    <div className="text-center hidden sm:block">{flight.sta || "--:--"}</div>
                )
            }

            {editMode ? (
                <TextField
                    type="date"
                    size="small"
                    value={local.startDate || ""}
                    onChange={(e) =>
                    setLocal({ ...local, startDate: e.target.value })
                    }
                    InputLabelProps={{ shrink: true }}
                />
            ) : (
                <div className="text-center hidden md:block">{dayjs(flight.startDate).format("D MMM YYYY")}</div>
            )}

            {editMode ? (
                <TextField
                    type="date"
                    size="small"
                    value={local.endDate || ""}
                    onChange={(e) =>
                    setLocal({ ...local, endDate: e.target.value })
                    }
                    InputLabelProps={{ shrink: true }}
                />
            ) : (
                <div className="text-center hidden md:block">{dayjs(flight.endDate).format("D MMM YYYY")}</div>
            )}

            <div className="text-center hidden lg:block">{flight.bodyType === "narrow_body" ? "Narrow" : "Wide"}</div>

            <Tooltip title={fullDays} arrow>
                <div className="hidden lg:flex gap-1 overflow-x-auto whitespace-nowrap scrollbar-hide max-w-40">
                    {flight.daysOfOperation?.map((d) => (
                    <span
                        key={d}
                        className="px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700 border border-cyan-200 flex-shrink-0"
                    >
                        {dayMap[d - 1]}
                    </span>
                    ))}
                </div>
            </Tooltip>

            <div className="text-center">
                <Switch checked={flight.status === "Active"} onChange={toggleStatus} />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between items-center gap-1">
                {editMode ? (
                    <>
                        <Button size="small" onClick={handleSave}>
                            {loading ? "..." : "Save"}
                        </Button>
                        <Button size="small" onClick={() => setEditMode(false)}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Tooltip title="Edit" arrow>
                        <Button size="small" onClick={() => setEditMode(true)}>
                            <CiEdit size={25} className=" text-green-600" />
                        </Button>
                    </Tooltip>
                )}

                <Tooltip title="Delete" arrow>
                    <Button size="small" onClick={handleDelete}>
                        <FiTrash2 size={25} className="text-red-600" />
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
};

export default FlightRow;