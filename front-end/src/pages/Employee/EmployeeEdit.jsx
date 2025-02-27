import EmployeeForm from "./EmployeeForm"
import useFetch from "../../hooks/useFetch"
import { useParams } from "react-router-dom"
function EmployeeEdit() {
  const {employeeId} = useParams();
  const { data, loading, error } = useFetch(`employees/${employeeId}`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <EmployeeForm employeeData={data} />
  )
}

export default EmployeeEdit