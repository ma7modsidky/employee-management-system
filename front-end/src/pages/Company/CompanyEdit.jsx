import CompanyForm from "./CompanyForm"
import useFetch from "../../hooks/useFetch"
import { useParams } from "react-router-dom"
function EmployeeEdit() {
  const {companyId} = useParams();
  const { data, loading, error } = useFetch(`companies/${companyId}/`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
    <h3 className="text-2xl my-4 text-center">Edit Company <span className="font-bold">[{data.id}] {data.company_name}</span></h3>
    <CompanyForm companyData={data} />
    </>
  )
}

export default EmployeeEdit