import { Button, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { menuItems } from "../util/constants";
import "../style.css";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleSidebar = () => {
    setCollapsed(!collapsed);
  }

  return (
    <div className={`bg-warning-subtle border-end d-flex flex-column p-3 ${collapsed ? 'sidebar-sm' : "sidebar-lg"}`}>
      <Button className="bg-transparent border-0 text-dark align-self-end mb-3" onClick={handleSidebar}>
        {
          collapsed ? <PanelLeftOpen /> : <PanelLeftClose size={18} />
        }
      </Button>
      <Nav className="flex-column">
        {menuItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `d-flex align-items-center gap-3 text-decoration-none text-dark p-2 rounded mb-2 sidebar-link ${isActive
                ? "bg-warning"
                : ""
              }`
            }
          >
            <Icon size={20} />

            {!collapsed && <span>{name}</span>}
          </NavLink>
        ))}
      </Nav>
    </div>
  );
};

export default AdminSidebar;