import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import GenericTable from "../../components/Generics/GenericTable";
import { useParams } from "react-router-dom";

function UserList() {
  const url = 'users/'
  const columns = [
    { key: "id", header: "ID" },
    { key: "user_name", header: "Username" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
  ];
  const { data, loading, error } = useFetch(url);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (data && data.length > 0) {
      setFilteredData([...data]); // Update filteredData once data is fetched
    }
  }, [data]);
  console.log(data)

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
      <h1 className="text-2xl font-bold ">Users List</h1>
      <GenericTable
        data={filteredData}
        columns={columns}
        pageSize={10}
        onFilter={handleFilter}
        detailPrefix="users"
      />
    </div>
  );
}

export default UserList;
