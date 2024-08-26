import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { AddDataByKelas } from '../store/actionCreator';

export default function AddDataKelas() {
  const input = {
   absenKelas : '',
   jumlahTidakHadir : 0,
   details : ''
  };

  const [data, setData] = useState(input);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false); 
  const handleAddChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const resetForm = () => {
    setData({
      absenKelas : '',
      jumlahTidakHadir : null,
      details : ''
    });
  };
  const handleSubmit = async(event) => {
    try {
      event.preventDefault();
      await dispatch(AddDataByKelas(data));
      document.getElementById("my_modal_kelas").close();
      toast.success('Add Data Successfully', {
        position: 'top-right',
        autoClose: 2000
      });
      resetForm()
    } catch (error) {
      console.error('Error :', error);
      toast.error('Failedr', {
        position: 'top-right',
        autoClose: 2000
      });
    }
  };

  return (
    <div>
      <button
        className=" btn bg-green-500 px-3 py-1 rounded-lg max-sm:w-full text-white"
        onClick={() => document.getElementById('my_modal_kelas').showModal()}
      >
        Add Data Kelas
      </button>
      <dialog id="my_modal_kelas" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-end">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => document.getElementById('my_modal_kelas').close()}
              >
                ✕
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-4">Add Data Kelas</h2>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Jadwal Kelas</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                name="absenKelas"
                value={data.absenKelas}
                onChange={handleAddChange}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Jumlah Tidak Hadir</span>
              </label>
              <div className="relative">
                <input
                  type="number" // Toggle input type
                  placeholder="Enter your Number"
                  className="input input-bordered w-full"
                  name="jumlahTidakHadir"
                  value={data.jumlahTidakHadir}
                  onChange={handleAddChange}
                />
              </div>
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Detail</span>
              </label>
              <textarea
                type="text"
                placeholder="Enter your Detail"
                className="textarea textarea-bordered w-full"
                name="details"
                value={data.details}
                onChange={handleAddChange}
              />
            </div>
         
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
     
    </div>
  )
}
