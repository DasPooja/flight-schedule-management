import flightsData from "./data/flights.json";
import { useFlights } from "./hooks/useFlights";
import FlightTable from "./components/FlightTable";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import { Toaster } from "react-hot-toast";
import { Card, CardContent, Typography, Button } from "@mui/material";

function App() {
  const {
      filteredFlights,
      setFlights,
      selected,
      setSelected,
      toggleSelect,
      deleteSelected,
      filters,
      setFilters,
      setSearch,
  } = useFlights(flightsData.flights);

  const handleClear = () => {
    setFilters({});
    setSearch("");
  };

  return (
    <>
      <div className="p-2 min-h-screen">
        <div className="max-w-350 mx-auto space-y-4 p-4 md:p-6 border border-gray-300 rounded-2xl">
          <Toaster />
          <Typography variant="h5" className="font-bold text-2xl">
            Flight Schedule Management
          </Typography>
          <Typography variant="body2" className="text-gray-500 text-sm pb-2">
            {filteredFlights.length} flights
          </Typography>

          {/* CARD START */}
          <Card className="rounded-2xl shadow-none border-0">
            <CardContent className="space-y-5">
              {/* ROW 1 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <SearchBar setSearch={setSearch} />
                <Filters filters={filters} setFilters={setFilters} type="row1" />
              </div>

              {/* ROW 2 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Filters 
                    filters={filters} 
                    setFilters={setFilters} 
                    type="row2"
                    flights={flightsData.flights}
                   />
              </div>

              {/* Bottom Actions */}
                <div className="flex justify-between items-center pt-2">
                  <Button
                    variant="outlined"
                    onClick={handleClear}
                  >
                    Clear all
                  </Button>
                </div>
              
            </CardContent>
          </Card>

          <FlightTable
            flights={filteredFlights}
            setFlights={setFlights}
            selected={selected}
            setSelected={setSelected}
            toggleSelect={toggleSelect}
            deleteSelected={deleteSelected}
          />

        </div>
      </div>
    </>
  )
}

export default App;
