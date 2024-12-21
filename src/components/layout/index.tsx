import Header from "./header";
import Sidebar from "./sidebar";
import { useState } from "react";
type LayoutProps = {
  children: React.ReactNode; // Accepts any valid React children
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev: boolean) => !prev);
  };
  return (
    <div className="w-full bg-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Main Content */}
      <div className="h-screen overflow-hidden relative">
        <Header onMenuClick={toggleSidebar} />

        <div className="relative flex h-[calc(100vh-64px)]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
