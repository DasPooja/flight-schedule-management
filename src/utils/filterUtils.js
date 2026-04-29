export const applyFilters = (flights, filters, search) => {
  return flights.filter((f) => {
    // Search
    const matchSearch =
      !search ||
      f.flightNumber.includes(search) ||
      f.origin.toLowerCase().includes(search) ||
      f.destination.toLowerCase().includes(search);

    const matchAOC =
      !filters.aoc || f.aoc === filters.aoc;

    const matchBodyType =
      !filters.bodyType || f.bodyType === filters.bodyType;
  
    const matchStartDate =
      !filters.startDate || f.startDate >= filters.startDate;

    const matchEndDate =
      !filters.endDate || f.endDate <= filters.endDate;

    const matchDays =
      !filters.days || filters.days.length === 0 ||
      filters.days.some(day =>
        f.daysOfOperation.includes(day)
      );

    const matchStatus =
      !filters.status || f.status === filters.status;

    return (
      matchSearch && 
      matchAOC && 
      matchBodyType && 
      matchStartDate && 
      matchEndDate && 
      matchDays &&
      matchStatus
    );
  });
};