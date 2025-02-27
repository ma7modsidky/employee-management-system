import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CompanyList from "./pages/Company/CompanyList";
import CompanyDetail from "./pages/Company/CompanyDetail";
import CompanyPageLayout from "./pages/Company/CompanyPageLayout";
import CompanyCreate from "./pages/Company/CompanyCreate";
import CompanyEdit from "./pages/Company/CompanyEdit";
import DepartmentList from "./pages/Department/DepartmentList";
import DepartmentDetail from "./pages/Department/DepartmentDetail";
import DepartmentCreate from "./pages/Department/DepartmentCreate";
import DepartmentEdit from "./pages/Department/DepartmentEdit";
import EmployeeList from "./pages/Employee/EmployeeList";
import EmployeeDetail from "./pages/Employee/EmployeeDetail";
import EmployeeCreate from "./pages/Employee/EmployeeCreate";
import EmployeeEdit from "./pages/Employee/EmployeeEdit";
import EmployeeForm from "./pages/Employee/EmployeeForm";
import Layout from "./components/Layout";
import DepartmentPageLayout from "./pages/Department/DepartmentPageLayout";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />
            {/* Company Management */}
            <Route path="/company">
              <Route index element={<CompanyList />} />
              <Route path=":companyId" element={<CompanyPageLayout />}>
                <Route path='' element={<CompanyDetail />} />
                <Route path="edit" element={<CompanyEdit />} />
                <Route path="department">
                  <Route index element={<DepartmentList />} />
                  <Route path=":departmentId" element={<DepartmentPageLayout />} >
                    <Route path='' element={<DepartmentDetail />} />
                  </Route>
                </Route>
              </Route>
              <Route path='create' element={<CompanyCreate />} />
            </Route>
            <Route path="/department">
              <Route index element={<DepartmentList />} />
              <Route path=":departmentId" element={<DepartmentDetail />} />
              <Route path="create" element={<DepartmentCreate />} />
              <Route path=":departmentId/edit" element={<DepartmentEdit />} />
            </Route>
            <Route path="/employee">
              <Route index element={<EmployeeList />} />
              <Route path=":employeeId" element={<EmployeeDetail />} />
              <Route path="create" element={<EmployeeCreate />} />
              <Route path=":employeeId/edit" element={<EmployeeEdit />} />
            </Route>
          </Route>

          {/* Fallback Route */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
