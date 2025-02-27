import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import GenericTable from "../../components/Generics/GenericTable";
import { useParams } from "react-router-dom";

function DepartmentList() {
  const {companyId} = useParams();
  const url = companyId ? `departments/?company=${companyId}` : `departments`
  console.log('hello from department list', url);
  const columns = [
    { key: "id", header: "ID" },
    { key: "department_name", header: "Name" },
    { key: "number_of_employees", header: "Employees" },
    { key: "company", header: "Company" },
  ];
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
    <div>
      <h1 className="text-2xl font-bold ">Departments List</h1>
      <GenericTable
        data={filteredData}
        columns={columns}
        pageSize={10}
        onFilter={handleFilter}
        detailPrefix="department"
      />
    </div>
  );


}

export default DepartmentList