import GenericDetail from "../../components/Generics/GenericDetail";
import useFetch from "../../hooks/useFetch";
import { useParams, Link, Outlet} from "react-router-dom";
import EmployeeList from "../Employee/EmployeeList";
function DepartmentDetail() {
  const fields = {
    id: { label: "ID", editable: false },
    company: { label: "Company" , editable: false},
    department_name: { label: "Department Name" , editable: true},
    number_of_employees:{ label: "Employees", editable: false },
  }
  const { departmentId } = useParams();
  const { data, loading, error } = useFetch(`departments/${departmentId}`);
  const handleEdit = (updatedRecord) => {
    console.log("Updated Record:", updatedRecord);
  };

  const handleDelete = () => {
    console.log("Record Deleted");
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
        <GenericDetail
          record={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          fields={fields}
          name= 'Department'
        />
        <EmployeeList departmentId={departmentId}/>
        <Outlet />
    </div>
    

    
  );
}

export default DepartmentDetail