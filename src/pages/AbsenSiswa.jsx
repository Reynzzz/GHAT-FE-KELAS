import React, { useEffect } from "react";
import { FaCheck, FaTimes, FaCalendarCheck } from "react-icons/fa";
import AddDataKelas from "./AddDataKelas";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataKelas } from "../store/actionCreator";

export const AbsenSiswa = () => {
  const formatDate = (dateString) => {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        // hour: '2-digit', 
        // minute: '2-digit', 
        hour12: false 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
  const { kelas } = useSelector((state) => state.kelas);
  console.log(kelas);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataKelas());
  }, []);
  return (
    <div className="relative overflow-x-auto px-5">
      <div className="pb-2 pt-5 flex justify-end">
        <AddDataKelas />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-2 pl-5 ">
              No
            </th>
            <th scope="col" className="px-2 py-2 ">
              Kelas
            </th>
            <th scope="col" className="px-2 py-2 ">
              Jadwal Kelas
            </th>
            <th scope="col" className="px-2 py-2 ">
              Jumlah Tidak Hadir
            </th>
            <th scope="col" className="px-2 py-2 pl-6 ">
              Keterangan
            </th>
            {/* <th scope="col" className="px-2 py-2 ">
              Action
            </th> */}
          </tr>
        </thead>
        <tbody>
          {kelas && kelas.length > 0 ? (
            kelas.map((el, i) => (
              <tr
                key={el.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{i + 1}</td>
                <td className="px-6 py-4">
                  {el.Kelas.name}
                </td>
                <td className="px-6 py-4">
                  {formatDate(el.absenKelas)}
                </td>
                <td className="px-6 py-4">
                  {el?.jumlahTidakHadir ?? 'tidak ada'}
                </td>
                <td className="px-6 py-4">
                  {el?.details?? 'tidak ada'}
                </td>
              </tr>
            ))
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
