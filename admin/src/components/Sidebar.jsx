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
  };

  return (
    <div
      className={`bg-warning-subtle border-end d-flex flex-column p-0 flex-shrink-0 shadow z-2 
        ${collapsed ? 'sidebar-sm' : "sidebar-lg"}`}
    >
      <Button className={`bg-transparent border-0 text-dark mt-3
      ${collapsed ? "align-self-center" : "align-self-end"}`} onClick={handleSidebar}
      >
        {collapsed ? (
          <PanelLeftOpen size={20} />
        ) : (
          <PanelLeftClose size={20} />
        )}
      </Button>
      <hr />
      <Nav className="flex-column gap-1">
        {menuItems.map(({ name, path, icon: Icon }) => (
          <NavLink key={path} to={path}
            className={({ isActive }) =>
              `d-flex align-items-center text-decoration-none text-dark py-2 px-3
              ${collapsed ? "justify-content-center px-2" : "gap-3"}
              ${isActive
                ? "sidebar-button-color border-end border-warning border-4"
                : "sidebar-link"}`
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