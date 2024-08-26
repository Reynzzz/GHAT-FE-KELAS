import Icons from "feather-icons-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openSidebar } from "../store/sidebarSlice";
import { useLocation } from "react-router-dom";
const Header = () => {
  const [imgError, setImgError] = useState(false);
  const handleImgError = () => {
    setImgError(true);
  };

  const dispatch = useDispatch();

  const handleOpenSidebar = () => {
    dispatch(openSidebar());
  };
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case '/teacher-validation' : 
      return 'Validasi Kelas'
      case  '/dashboard':
        return 'Dashboard'
        case  '/absen-siswa':
        return 'Absen Data Siswa'
      default :
      return 'Header Text'
    }
  }
  return (
    <div className="max-sm:bg-white max-sm:pb-3 max-sm:z-10 max-sm:px-3 max-sm:py-2 max-sm:sticky max-sm:-top-1 max-sm:flex max-sm:justify-between max-sm:items-center max-sm:mt-2 sm:flex sm:w-full sm:justify-between sm:px-4 sm:py-10">
      <div
        className="hover:bg-gray-200 p-3 transition-all hover:cursor-pointer sm:hidden"
        onClick={handleOpenSidebar}
      >
        <Icons icon="menu" size={24} strokeWidth={2} />
      </div>
      <h2 className="text-blue-500 font-bold text-3xl sm:text-3xl">
      {getTitle()}
      </h2>
      <div className="flex sm:gap-1 justify-center  ">
        <div className="max-sm:hidden flex justify-center flex-col items-end">
          {" "}
          <div className="text-md font-bold">Kelas</div>
          <div className="text-gray-600 text-sm">Siswa</div>
        </div>
        <div className="avatar">
          <div className="max-sm:w-10 rounded-full border-green-400 sm:w-14 h-14 border-2 bg-red-200 flex justify-center items-center  ">
            {imgError ? (
              <div className=" h-full flex justify-center items-center">
                {" "}
                <Icons icon="user" size={28} />
              </div>
            ) : (
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                onError={handleImgError}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
