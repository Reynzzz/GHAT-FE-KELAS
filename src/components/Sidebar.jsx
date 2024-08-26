import Icons from "feather-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { closeSidebar, openSidebar, toggleSidebar } from "../store/sidebarSlice";
import { useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import Logo from "./Logo";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const navigate = useNavigate();
  const location = useLocation(); // Track the current route

  const handleClick = () => {
    if (window.innerWidth <= 640) {
      dispatch(toggleSidebar());
      localStorage.setItem("sidebarOpen", String(!isOpen)); // Save sidebar status in localStorage
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        dispatch(closeSidebar()); // Close sidebar in mobile view
      } else {
        dispatch(openSidebar()); // Open sidebar in desktop view
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth <= 640) {
      dispatch(closeSidebar());
    }
  }, [location, dispatch]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 bottom-0 left-0 max-sm:w-8/12 sm:w-72 bg-blue-500 z-20 grid grid-rows-12 grid-flow-col px-2 sm:pt-10">
          <div className="flex w-full justify-end pr-1 pt-1 max-sm:row-span-1 sm:hidden">
            <div className="hover:cursor-pointer" onClick={handleClick}>
              <Icons icon="x" size={32} strokeWidth={3} color="white" />
            </div>
          </div>
          <div className="flex flex-col items-center max-sm:row-span-3 sm:row-span-4">
            <Logo
              imageProps="max-sm:max-h-32 max-sm:max-w-48 md:h-28"
              h1Props="text-xl font-bold text-white text-center"
              h4Props="font-bold text-center italic text-yellow-200"
            />
          </div>
          <div className="max-sm:row-span-1 sm:row-span-1 flex flex-col ">
            <NavLink
              to={"/dashboard"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "btn btn-ghost flex gap-5 py-3 items-center rounded-md text-white font-bold bg-green-400 hover:bg-green-400"
                    : "btn btn-ghost flex justify-start text-white font-bold"
                }`
              }
            >
              <Icons icon="command" size={32} strokeWidth={3} color="white" />
              <div className="text-lg">Dashboard</div>
            </NavLink>
            <NavLink
              to={"/teacher-validation"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "btn btn-ghost flex gap-5 py-3 items-center rounded-md text-white font-bold bg-green-400 hover:bg-green-400"
                    : "btn btn-ghost flex justify-start text-white font-bold"
                }`
              }
            >
              <Icons icon="user" size={32} strokeWidth={3} color="white" />
              <div className="text-lg">Validasi Guru</div>
            </NavLink>
            <NavLink
              to={"/absen-siswa"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "btn btn-ghost flex gap-5 py-3 items-center rounded-md text-white font-bold bg-green-400 hover:bg-green-400"
                    : "btn btn-ghost flex justify-start text-white font-bold"
                }`
              }
            >
              <Icons icon="user" size={32} strokeWidth={3} color="white" />
              <div className="text-lg">Absen Siswa</div>
            </NavLink>
            <div className="p-4 mt-auto cursor-pointer flex items-center" onClick={handleLogout}>
              <button className="flex items-center ml-1 text-white font-bold text-lg">
                <FaSignOutAlt size={25} className="mr-2" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
