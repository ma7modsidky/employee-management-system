import { Outlet, useParams } from "react-router-dom"
import Navigation from "../../components/Company/Navigation"
import Breadcrumbs from "../../components/Company/Breadcrumbs";
function CompanyPageLayout() {
const {companyId} = useParams();
  return (
    <>
    {/* <Breadcrumbs /> */}
    {/* <h1 className="text-3xl font-bold ">Company Details : {companyId}</h1> */}
    <Navigation />
    <Outlet/>
    </>
  )
}

export default CompanyPageLayout