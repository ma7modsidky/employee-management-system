import { useState, useEffect } from "react";
import GenericTable from "../../components/Generics/GenericTable";
import useFetch from "../../hooks/useFetch";

const EmployeeList = ({departmentId}) => {
  // Define columns for the table
  const columns = [
    { key: "id", header: "ID" },
    { key: "employee_name", header: "Name" },
    { key: "company", header: "Company" },
    { key: "department", header: "Department" },
    { key: "designation", header: "Designation" },
  ];
  const url = departmentId ? `employees/?department=${departmentId}`: `employees/`

  const { data, loading, error } = useFetch(url);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (data && data.length > 0) {
      setFilteredData([...data]); // Update filteredData once data is fetched
    }
  }, [data]);

  const handleFilter = (filters) => {
    const filtered = data.filter((employee) =>
      Object.keys(filters).every((key) => {
        // Ensure both the filter value and the employee value are strings
        const filterValue = filters[key]?.toString().toLowerCase() || "";
        const employeeValue = employee[key]?.toString().toLowerCase() || "";
        return employeeValue.includes(filterValue);
      })
    );
    setFilteredData(filtered);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="my-2">
      <h1 className="text-2xl font-bold ">Employees List</h1>
      <GenericTable
        data={filteredData}
        columns={columns}
        pageSize={10}
        onFilter={handleFilter}
        detailPrefix="employee"
      />
    </div>
  );
};

export default EmployeeList;
