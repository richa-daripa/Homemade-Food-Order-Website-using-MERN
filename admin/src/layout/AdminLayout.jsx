import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/Navbar";
import AdminSidebar from "../components/Sidebar";
import { ToastContainer} from 'react-toastify';

const AdminLayout = () => {
  return (
    <div className="vh-100 d-flex flex-column">
      <AdminNavbar/>
      <ToastContainer />

      <div className="d-flex min-vh-100 overflow-hidden">
        <AdminSidebar />

        <main className="flex-grow-1 overflow-auto p-4 bg-light">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;