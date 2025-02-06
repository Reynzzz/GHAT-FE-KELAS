import React, { useState } from "react";
import { FaCalendarCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { validasiByKelas } from "../store/actionCreator";


export default function ModalValidasi({ id }) { // Menerima id sebagai props
  const [deskripsiKelas, setDeskripsiKelas] = useState("");
  const dispatch = useDispatch();
  console.log(id,'ni id');
  
  const handleValidate = async () => { // Tidak perlu parameter, gunakan props id
    try {
      await dispatch(validasiByKelas(id, deskripsiKelas));
      
      document.getElementById("my_modal_3").close();
      console.log("Validasi berhasil!");
    } catch (error) {
      console.error("Gagal memvalidasi:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => document.getElementById("my_modal_3").showModal()}
        className="flex items-center justify-center py-1 px-2 rounded bg-teal-500 text-white hover:bg-teal-600"
      >
        <FaCalendarCheck className="mr-1" /> Validasi
      </button>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg">Validasi Kehadiran</h3>
          <p className="py-2">Pilih status kehadiran:</p>

          <select
            value={deskripsiKelas}
            onChange={(e) => setDeskripsiKelas(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Pilih Status
            </option>
            <option value="Mengajar">Mengajar</option>
            <option value="Langsung Keluar/Hanya Absen">Langsung Keluar/Hanya Absen</option>
            <option value="Tidak Mengajar">Tidak Mengajar</option>
          </select>

          <div className="modal-action">
            <button
              onClick={handleValidate}
              className="btn bg-teal-500 text-white hover:bg-teal-600"
            >
              Validasi
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
