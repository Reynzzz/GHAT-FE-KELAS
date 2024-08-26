import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchScheduleByUser, validasiByKelas } from "../store/actionCreator";
import { FaCheck, FaTimes, FaCalendarCheck } from 'react-icons/fa';
import { toast } from "react-toastify";

const isLate = (jadwal, absen) => {
  if (!jadwal || !absen) return false;
  
  const jadwalTime = new Date(jadwal);
  const absenTime = new Date(absen);
  
  // Hitung selisih waktu dalam menit
  const diffMinutes = (absenTime - jadwalTime) / (1000 * 60);
  
  // Keterlambatan jika lebih dari 15 menit
  return diffMinutes > 15;
};

const RealTimeClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  return (
    <span>{currentTime.toLocaleTimeString(undefined, timeOptions)}</span>
  );
};

export const TeacherValidation = () => {
  const dispatch = useDispatch();
  const [localUsers, setLocalUsers] = useState([]);
  const { validasiKelas } = useSelector(state => state.validasiKelas);

  useEffect(() => {
    dispatch(fetchScheduleByUser());
  }, [dispatch]);

  useEffect(() => {
    setLocalUsers(validasiKelas);
  }, [validasiKelas]);

  const formatDate = (dateString) => {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false,
        timeZone: 'Asia/Makassar' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

  const renderStatus = (absenDate, jadwalDate) => {
    if (!absenDate) {
      return <span className="text-gray-500">Belum Absen</span>;
    }
    const lateStatus = isLate(jadwalDate, absenDate);
    return lateStatus ? (
      <span className="text-red-500">Terlambat</span>
    ) : (
      <span className="text-green-500">Tepat Waktu</span>
    );
  };
  
  const HandleValidate = async (id) => {
    // Update the local state immediately
    setLocalUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, statusKelas: true } : user
      )
    );
  
    try {
      // Attempt to validate the class
      await dispatch(validasiByKelas(id));
      toast.success('Validate Success');
    } catch (error) {
      // If validation fails, revert the local state change
      setLocalUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, statusKelas: false } : user
        )
      );
      toast.error('Error');
      console.log(error);
    }
  };
  
  return (
    <div className="relative overflow-x-auto px-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-2 text-center">No</th>
            <th scope="col" className="px-2 py-2 text-center">Username</th>
            <th scope="col" className="px-2 py-2 text-center">Kelas</th>
            <th scope="col" className="px-2 py-2 text-center">Jadwal Kelas</th>
            <th scope="col" className="px-2 py-2 text-center">Tanggal Absen</th>
            <th scope="col" className="px-2 py-2 text-center">Validasi Kelas</th>
            <th scope="col" className="px-2 py-2 text-center">Status Kehadiran</th>
            <th scope="col" className="px-2 py-2 text-center">Jam</th>
            <th scope="col" className="px-2 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {localUsers && localUsers.length > 0 ? (
            localUsers.map((el, i) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={i}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {i + 1}
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {el?.Guru.username}
                  </th>
                  <td className="px-6 py-4">
                    {el?.Kelas?.name ? el.Kelas.name : 'belum tersedia'}
                  </td>
                  <td className="px-6 py-4">
                    {el?.jadwalKelas ? formatDate(el.jadwalKelas) : 'belum tersedia'}
                  </td>
                  <td className="px-6 py-4">
                    {el?.tanggalAbsen ? formatDate(el.tanggalAbsen) : 'belum tersedia'}
                  </td>
                  <td className="px-10 py-4 text-center">
                    {el?.statusKelas ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {renderStatus(el?.tanggalAbsen, el?.jadwalKelas)}
                  </td>
                  <td className="px-6 py-4">
                    <RealTimeClock />
                  </td>
                  <td className="p-2 py-4">
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => HandleValidate(el.id)}
                        className={`flex items-center justify-center py-1 px-2 rounded bg-teal-500 text-white hover:bg-teal-600 ${el.statusKelas ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={el.statusKelas} // Disable the button if already validated
                      >
                        <FaCalendarCheck className="mr-1" /> Validate
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9" className="px-6 py-4 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
