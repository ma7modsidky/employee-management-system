import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CompanyList from "./pages/Company/CompanyList";
import CompanyDetail from "./pages/Company/CompanyDetail";
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
import Layout from "./components/Layout";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/company">
              <Route index element={<CompanyList />} />
              <Route path=":id" element={<CompanyDetail />} />
              <Route path="create" element={<CompanyCreate />} />
              <Route path="edit/:id" element={<CompanyEdit />} />
            </Route>
            <Route path="/department">
              <Route index element={<DepartmentList />} />
              <Route path=":id" element={<DepartmentDetail />} />
              <Route path="create" element={<DepartmentCreate />} />
              <Route path="edit/:id" element={<DepartmentEdit />} />
            </Route>
            <Route path="/employee">
              <Route index element={<EmployeeList />} />
              <Route path=":id" element={<EmployeeDetail />} />
              <Route path="create" element={<EmployeeCreate />} />
              <Route path="edit/:id" element={<EmployeeEdit />} />
            </Route>
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
