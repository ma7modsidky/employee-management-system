import GenericDetail from "../../components/Generics/GenericDetail";
import useFetch from "../../hooks/useFetch";
import { useParams, Outlet} from "react-router-dom";

function UserDetail() {
  const fields = {
    id: { label: "ID", editable: false },
    user_name: { label: "Username" , editable: false},
    name: { label: "Name" , editable: true},
    email: { label: "Email" , editable: true},
    role:{ label: "Role", editable: false },
  }
  const { userId } = useParams();
  const { data, loading, error } = useFetch(`users/${userId}`);
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
          name= 'User'
        />
    </div>
  )
}

export default UserDetail