import { useMemo } from "react";
import { TextField, InputAdornment } from "@mui/material";
import debounce from "lodash.debounce";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ setSearch }) => {
  const debounced = useMemo(
    () => debounce((val) => setSearch(val), 400),
    []
  );

  return (
    <TextField
      label="Search by flight no, origin or destination"
      fullWidth
      size="small"
      onChange={(e) => debounced(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FiSearch className="text-gray-500"  />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;