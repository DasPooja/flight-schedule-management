import { 
  Select, 
  MenuItem, 
  InputLabel,
  FormControl, 
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const days = ["Mon","Tue","Wed","Thu","Fri","Sat", "Sun",];

const Filters = ({ filters, setFilters, type, flights = [] }) => {

  const uniqueAOCs = [...new Set(flights.map(f => f.aoc))].sort();

  const toggleDay = (dayIndex) => {
    setFilters(prev => ({
      ...prev,
      days: prev.days?.includes(dayIndex)
        ? prev.days.filter(d => d !== dayIndex)
        : [...(prev.days || []), dayIndex]
    }));
  };

   // ROW 1
  if (type === "row1") {
    return (
      <>
        {/* Start Date */}
        <DatePicker
          label="Start Date"
          format="DD/MM/YYYY"
          value={filters.startDate ? dayjs(filters.startDate) : null}
          onChange={(newValue) =>
            setFilters(prev => ({
              ...prev,
              startDate: newValue
                ? newValue.format("YYYY-MM-DD")
                : ""
            }))
          }
          slotProps={{
            textField: {
              size: "small",
              fullWidth: true,
            },
          }}
        />

        {/* End Date */}
        <DatePicker
          label="End Date"
          format="DD/MM/YYYY"
          value={filters.endDate ? dayjs(filters.endDate) : null}
          onChange={(newValue) =>
            setFilters(prev => ({
              ...prev,
              endDate: newValue
                ? newValue.format("YYYY-MM-DD")
                : ""
            }))
          }
          slotProps={{
            textField: {
              size: "small",
              fullWidth: true,
            },
          }}
        />

        {/* STATUS */}
        <FormControl size="small" fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status || "all"}
            label="Status"
            onChange={(e) =>
              setFilters(prev => ({
                ...prev,
                status: e.target.value === "all" ? "" : e.target.value
              }))
            }
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </>
    );
  }

  // ROW 2
  if (type === "row2") {
    return (
      <>
        {/* AOC */}
        <FormControl size="small" fullWidth>
          <InputLabel>AOC</InputLabel>
          <Select
            value={filters.aoc || "all"}
            label="AOC"
            onChange={(e) =>
              setFilters(prev => ({
                ...prev,
                aoc: e.target.value === "all" ? "" : e.target.value
              }))
            }
          > 
            <MenuItem value="all">All</MenuItem>
            {uniqueAOCs.map((aoc) => (
              <MenuItem key={aoc} value={aoc}>
                {aoc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* BODY TYPE */}
        <FormControl size="small" fullWidth>
          <InputLabel>Body Type</InputLabel>
          <Select
            value={filters.bodyType || "all"}
            label="Body Type"
            onChange={(e) =>
              setFilters(prev => ({
                ...prev,
                bodyType: e.target.value === "all" ? "" : e.target.value
              }))
            }
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="narrow_body">Narrow Body</MenuItem>
            <MenuItem value="wide_body">Wide Body</MenuItem>
          </Select>
        </FormControl>

        {/* DAYS */}
        <div className="col-span-2">
          <div className="text-sm text-gray-500 mb-1">
            Days of operation
          </div>

          <div className="flex flex-wrap gap-2">
            {days.map((d, i) => {
              const active = filters.days?.includes(i + 1);

              return (
                <button
                  key={i}
                  onClick={() => toggleDay(i + 1)}
                  className={`px-3 py-1 rounded-md text-sm border cursor-pointer transition
                    ${
                      active
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white hover:bg-blue-50"
                    }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default Filters;