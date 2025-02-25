import { Outlet } from "react-router-dom"
import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/Footer"
function Layout() {
  return (
    <>
    <Navbar />
    <main className="App bg-base-300 p-4 main-content">
        <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default Layout