import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-full sm:ml-[300px] ml-0">
          <Header />
          <div>{children}</div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
