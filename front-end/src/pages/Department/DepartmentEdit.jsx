import DepartmentForm from "./DepartmentForm";
import useFetch from "../../hooks/useFetch"
import { useParams } from "react-router-dom"
function EmployeeEdit() {
  const {departmentId} = useParams();
  const { data, loading, error } = useFetch(`departments/${departmentId}/`);
  console.log(data, loading, loading, loading, loading, loading)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
    <h3 className="text-2xl my-4 text-center">Edit Department <span className="font-bold">[{data.id}] {data.department_name}</span></h3>
    <DepartmentForm departmentData={data} />
    </>
  )
}

export default EmployeeEdit