import CompanyForm from "./CompanyForm"
import useFetch from "../../hooks/useFetch"
import { useParams } from "react-router-dom"
function EmployeeEdit() {
  const {companyId} = useParams();
  const { data, loading, error } = useFetch(`companies/${companyId}/`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <CompanyForm companyData={data} />
  )
}

export default EmployeeEdit