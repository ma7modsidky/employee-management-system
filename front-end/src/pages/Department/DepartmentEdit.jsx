import DepartmentForm from "./DepartmentForm";
import useFetch from "../../hooks/useFetch"
import { useParams } from "react-router-dom"
function EmployeeEdit() {
  const {departmentId} = useParams();
  const { data, loading, error } = useFetch(`departments/${departmentId}/`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <DepartmentForm departmentData={data} />
  )
}

export default EmployeeEdit