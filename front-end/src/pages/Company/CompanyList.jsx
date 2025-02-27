import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import GenericTable from "../../components/Generics/GenericTable";

function CompanyList() {
  const columns = [
    { key: "id", header: "ID" },
    { key: "company_name", header: "Name" },
    { key: "number_of_departments", header: "Departments" },
    { key: "number_of_employees", header: "Employees" },
  ];
  const { data, loading, error } = useFetch("companies/");
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
    <div>
      <h1 className="text-3xl font-bold ">Companies List</h1>
      <GenericTable
        data={filteredData}
        columns={columns}
        pageSize={10}
        onFilter={handleFilter}
        detailPrefix="company"
      />
    </div>
  );
}

export default CompanyList;
