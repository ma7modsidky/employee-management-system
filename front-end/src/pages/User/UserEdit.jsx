import UserForm from './UserForm';
import useFetch from "../../hooks/useFetch"
import { useParams } from "react-router-dom"
function UserEdit() {
  const {userId} = useParams();
  const { data, loading, error } = useFetch(`users/${userId}/`);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <UserForm userData={data} />
  )
}

export default UserEdit