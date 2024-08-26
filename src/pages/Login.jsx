import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Icons from "feather-icons-react";
import { HandleLogin } from "../store/actionCreator";
import Logo from "../components/Logo";

const Login = () => {
  const input = {
    name: "",
    password: "",
  };
  const [data, setData] = useState(input);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  async function handleLoginKelas(event) {
    event.preventDefault();
    console.log(data, 'ni log'); // Logging data

    try {
      await dispatch(HandleLogin(data));
      navigate("/dashboard");
      toast.success("Login Success", {
        position: 'top-right',
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(error.msg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error(error);
    }
  }

  return (
    <>
      <div className="md:flex max-sm:flex-col ">
        <div className="max-sm:h-[18rem] relative max-sm:w-full w-11/12">
          <div className="">
            <div className="absolute max-sm:h-[18rem] h-[100vh] bg-black/60 z-10 w-full"></div>
            <div className="max-sm:pb-6 bg-bg-log md:h-[100vh] bg-cover max-sm:flex-col max-sm:items-center max-sm:flex max-sm:justify-end max-sm:gap-5 max-sm:h-[18rem] md:gap-5 max-sm:pt-6 max-sm:mb-3 bg-no-repeat max-sm:bg-cover md:flex md:flex-col sm:flex sm:flex-col sm:items-center md:items-center md:justify-center "></div>
            <div className="absolute top-0 z-30 max-sm:h-[18rem] h-[100vh] w-full items-center max-sm:justify-end md:justify-center gap-5 pb-3 flex flex-col ">
              <Logo
               imageProps="max-sm:max-h-32 max-sm:max-w-48 md:h-60"
               h1Props="text-4xl font-bold text-white text-center"
               h4Props="font-bold text-center italic text-yellow-200"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:flex md:flex-col md:justify-center md:pl-36">
          <div className="pb-4">
            <h1 className="text-blue-400 font-bold text-4xl max-sm:text-center max-md:text-center">
              KHAT
            </h1>
            <p className="max-sm:text-center font-bold text-sm max-md:text-center">
              Kelas Hadir Absensi Terstruktur
            </p>
          </div>
          <form onSubmit={handleLoginKelas}>
            <div className="max-sm:px-5 max-sm:mt-3 flex flex-col max-sm:gap-5 md:gap-6 max-md:items-center">
              <div className="max-md:w-8/12 max-sm:w-full">
                <p className="font-bold pb-1 text-base">Username</p>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered input-primary max-sm:w-full w-6/12 max-md:w-full border-2 p-2 rounded-md border-blue-300"
                  value={data.name}
                  onChange={handleChange}
                />
              </div>
              <div className="max-md:w-8/12 max-sm:w-full relative">
                <p className="font-bold pb-1 text-base">Password</p>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input input-bordered input-primary max-sm:w-full w-6/12 max-md:w-full border-2 p-2 rounded-md border-blue-300 pr-10"
                    value={data.password}
                    onChange={handleChange}
                  />
                  {/* <Icons
                    icon={showPassword ? "eye-off" : "eye"}
                    onClick={handleTogglePassword}
                    size={20}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-blue-500"
                  /> */}
                </div>
              </div>
              <button type="submit" className="btn mt-4 p-3 rounded-md bg-green-400 text-base font-bold text-white md:w-6/12 max-md:w-8/12 max-sm:w-full">
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
