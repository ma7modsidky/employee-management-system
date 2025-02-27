import GenericDetail from "../../components/Generics/GenericDetail"
import useFetch from "../../hooks/useFetch"
import {useParams} from 'react-router-dom'
function EmployeeDetail() {
  const fields = {
    id : { label: "ID", editable: false },
    company: { label: "Company" , editable: false ,},
    department: { label: "Department" , editable: false},
    employee_status: { label: "Status" , editable: true},
    employee_name :{ label: "Name", editable: true },
    email_address :{ label: "Email Address", editable: true },
    address :{ label: "Address", editable: true },
    mobile_number: { label: "Mobile Number" , editable: true},
    designation: { label: "Designation" , editable: true},
    hired_on :{ label: "Hired On", editable: false },
    days_employed :{ label: "Days Employed", editable: false },
  }

  const {employeeId} = useParams();
  
  const { data, loading, error } = useFetch(`employees/${employeeId}`);
  
  const handleEdit = (updatedRecord) => {
    console.log("Updated Record:", updatedRecord);
  };

  const handleDelete = () => {
    console.log("Record Deleted");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    
    <div className="p-8">
      <GenericDetail
        record={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        fields={fields}
        name="Employees"
      />
    </div>
    
  )
}

export default EmployeeDetail