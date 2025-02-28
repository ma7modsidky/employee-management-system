import "./App.css";
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
import UserList from "./pages/User/UserList";
import UserDetail from "./pages/User/UserDetail";
import UserCreate from "./pages/User/UserCreate";
import UserEdit from "./pages/User/UserEdit";
import Layout from "./components/Layout";
import DepartmentPageLayout from "./pages/Department/DepartmentPageLayout";
import Unauthorized from "./pages/Unauthorized";
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
            {/* All Departments Management */}
            <Route path="/department">
              <Route index element={<DepartmentList />} />
              <Route path=":departmentId" element={<DepartmentDetail />} />
              <Route path="create" element={<DepartmentCreate />} />
              <Route path=":departmentId/edit" element={<DepartmentEdit />} />
            </Route>
            {/* All Employees Management */}
            <Route path="/employee">
              <Route index element={<EmployeeList />} />
              <Route path=":employeeId" element={<EmployeeDetail />} />
              <Route path="create" element={<EmployeeCreate />} />
              <Route path=":employeeId/edit" element={<EmployeeEdit />} />
            </Route>
            {/* All Users Management */}
            <Route path="/users">
              <Route index element={<UserList />} />
              <Route path=":userId" element={<UserDetail />} />
              <Route path="create" element={<UserCreate />} />
              <Route path=":userId/edit" element={<UserEdit />} />
            </Route>
          </Route>

          {/* Fallback Route */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
