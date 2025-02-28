import { Outlet } from "react-router-dom"
import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/Footer"
import Breadcrumbs from "./BreadCrumbs"
function Layout() {
  return (
    <>
    <Navbar />
    {/* Breadcrumbs */}
    <div className="p-4 bg-base-200">
        <Breadcrumbs />
      </div>
    <main className="App bg-base-300 p-4 main-content">
        <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default Layout