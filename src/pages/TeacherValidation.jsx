import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCalendarCheck, FaCheck, FaTimes } from "react-icons/fa";
import { fetchScheduleByUser, validasiByKelas } from "../store/actionCreator";
import { toast } from "react-toastify";

export const TeacherValidation = () => {
  const dispatch = useDispatch();
  const [localUsers, setLocalUsers] = useState([]);
  const { validasiKelas } = useSelector((state) => state.validasiKelas);
  const [modalData, setModalData] = useState({ isOpen: false, id: null, deskripsiKelas: "" });

  useEffect(() => {
    dispatch(fetchScheduleByUser());
  }, [dispatch]);

  useEffect(() => {
    setLocalUsers(validasiKelas);
  }, [validasiKelas]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Makassar",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isLate = (jadwal, absen) => {
    if (!jadwal || !absen) return false;
    const diffMinutes = (new Date(absen) - new Date(jadwal)) / (1000 * 60);
    return diffMinutes > 15;
  };

  const handleValidate = async () => {
    try {
      await dispatch(validasiByKelas(modalData.id, modalData.deskripsiKelas));
      setModalData({ isOpen: false, id: null, deskripsiKelas: "" });
      toast.success("Validasi berhasil!");
    } catch (error) {
      toast.error("Gagal memvalidasi");
      console.error("Gagal memvalidasi:", error);
    }
  };

  return (
    <div className="relative overflow-x-auto px-5">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <tr>
            <th className="px-2 py-2 text-center">No</th>
            <th className="px-2 py-2 text-center">Username</th>
            <th className="px-2 py-2 text-center">Kelas</th>
            <th className="px-2 py-2 text-center">Jadwal Kelas</th>
            <th className="px-2 py-2 text-center">Tanggal Absen</th>
            <th className="px-2 py-2 text-center">Validasi Kelas</th>
            <th className="px-2 py-2 text-center">Status Kehadiran</th>
            <th className="px-2 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {localUsers.length > 0 ? (
            localUsers.map((el, i) => (
              <tr key={i} className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-2 py-4 text-center">{i + 1}</td>
                <td className="px-2 py-4 text-center">{el?.Guru.username}</td>
                <td className="px-2 py-4 text-center">{el?.Kelas?.name || "Belum tersedia"}</td>
                <td className="px-2 py-4 text-center">{el?.jadwalKelas ? formatDate(el.jadwalKelas) : "Belum tersedia"}</td>
                <td className="px-2 py-4 text-center">{el?.tanggalAbsen ? formatDate(el.tanggalAbsen) : "Belum tersedia"}</td>
                <td className="px-2 py-4 text-center">{el?.statusKelas ? <FaCheck className="text-green-500 text-center" /> : <FaTimes className="text-red-500 text-center  " />}</td>
                <td className="px-2 py-4 text-center">{el?.tanggalAbsen ? (isLate(el.jadwalKelas, el.tanggalAbsen) ? "Terlambat" : "Tepat Waktu") : "Belum Absen"}</td>
                <td className="px-2 py-4 text-center">
                <button
  className={`px-4 py-2 rounded ${
    el.statusKelas ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
  } text-white`}
  disabled={el.statusKelas}
>
  {el.statusKelas ? 'Sudah validasi' : 'Validasi'}
</button>

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="px-6 py-4 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {modalData.isOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <button
              onClick={() => setModalData({ isOpen: false, id: null, deskripsiKelas: "" })}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>

            <h3 className="font-bold text-lg">Validasi Kehadiran</h3>
            <p className="py-2">Pilih status kehadiran:</p>

            <select
              value={modalData.deskripsiKelas}
              onChange={(e) => setModalData({ ...modalData, deskripsiKelas: e.target.value })}
              className="select select-bordered w-full"
            >
              <option value="" disabled>Pilih Status</option>
              <option value="Mengajar">Mengajar</option>
              <option value="Langsung Keluar/Hanya Absen">Langsung Keluar/Hanya Absen</option>
              <option value="Tidak Mengajar">Tidak Mengajar</option>
            </select>

            <div className="modal-action">
              <button onClick={handleValidate} className="btn bg-teal-500 text-white hover:bg-teal-600">
                Validasi
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};
