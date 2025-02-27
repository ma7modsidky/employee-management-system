import { Outlet, useParams } from "react-router-dom"
import Navigation from "../../components/Company/Navigation"
import Breadcrumbs from "../../components/Company/Breadcrumbs";
function DepartmentPageLayout() {
const {departmentId} = useParams();
  return (
    <>
    <Outlet/>
    </>
  )
}

export default DepartmentPageLayout