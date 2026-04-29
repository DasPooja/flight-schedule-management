import { useState, useMemo } from "react";
import { applyFilters } from "../utils/filterUtils";

export const useFlights = (initialData) => {
  const [flights, setFlights] = useState(initialData);
  const [selected, setSelected] = useState([]);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");

  const filteredFlights = useMemo(() => {
    return applyFilters(flights, filters, search);
  }, [flights, filters, search]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const deleteSelected = () => {
    setFlights((prev) => prev.filter((f) => !selected.includes(f.id)));
    setSelected([]);
  };

  return {
    flights,
    setFlights,
    filteredFlights,
    selected,
    setSelected,
    toggleSelect,
    deleteSelected,
    filters,
    setFilters,
    search,
    setSearch,
  };
};