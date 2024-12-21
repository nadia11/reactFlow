import Header from './header';
import Sidebar from './sidebar';
type LayoutProps = {
    children: React.ReactNode; // Accepts any valid React children
  };
  console.log("Layout rendered");
 const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full bg-white">
      {/* Header */}
      <Header />

      {/* Layout Body */}
      <div className="relative flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="h-full w-full ml-64">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
