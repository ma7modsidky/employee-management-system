import GenericDetail from "../../components/Generics/GenericDetail";
import useFetch from "../../hooks/useFetch";
import { useParams, Link, Outlet} from "react-router-dom";
import DepartmentList from "../Department/DepartmentList";
function CompanyDetail() {
  const fields = {
    id: { label: "ID", editable: false },
    company_name: { label: "Name" , editable: true},
    number_of_departments:{label: "Departments", editable: false },
    number_of_employees:{ label: "Employees", editable: false },
  }
  const { companyId } = useParams();
  const { data, loading, error } = useFetch(`companies/${companyId}`);

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
          name= 'Company'
        />
         <Outlet />
         <DepartmentList companyId={companyId}/>
    </div>
    
    
  );
}

export default CompanyDetail;
