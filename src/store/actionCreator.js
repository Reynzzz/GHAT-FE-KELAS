import { HANDLE_LOGIN_KELAS, POST_DATA_KELAS, READ_DATA_KELAS, READ_SCHEDULE_BY_KELAS, VALIDASI_KELAS } from "./actionTypes";
const BASE_URL = 'https://api-v1.ghatmtsn1.com'
// const BASE_URL = 'http://localhost:4000'
export const actionGenerator = (type, payload) => {
    return {
      type,
      payload,
    };
  };
  export const HandleLogin = (data) => {
    console.log(data);
    return async (dispatch) => {
      try {
        const response = await fetch(BASE_URL + "/kelasLogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const responseJSON = await response.json();
        if (!response.ok) {
          throw responseJSON;
        }
        const { access_token, user } = responseJSON;
  
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user", user.name);
        // localStorage.setItem("user2", user.type);
        // dispatch(setUserType(user.role));
        // dispatch(setUsername(user));
        // dispatch(setCategory(user.type))
        dispatch(actionGenerator(HANDLE_LOGIN_KELAS, responseJSON));
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
  };
  export const fetchScheduleByUser = () => {
    return async (dispatch) => {
      try {
        // localStorage.setItem("access_token", access_token);
        const token = localStorage.getItem("access_token"); 
        console.log(token,'ni log');// Ambil token dari localStorage
        const response = await fetch(BASE_URL + `/Kelasschedule`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
            // access_token: localStorage.getItem("access_token"),
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch absensi");
        }
        dispatch(actionGenerator(READ_SCHEDULE_BY_KELAS, data));
      } catch (error) {
        console.log(error, "<<<<<<<<<");
        throw error;
      }
    };
  };
  export const validasiByKelas= (id) => {
    // console.log(id);
    return async (dispatch) => {
      try {
        // localStorage.setItem("access_token", access_token);
        const token = localStorage.getItem("access_token"); 
        // console.log(token,'ni log');// Ambil token dari localStorage
        const response = await fetch(BASE_URL + `/validasiKelas/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
            // access_token: localStorage.getItem("access_token"),
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "eror update");
        }
        dispatch(fetchScheduleByUser,(actionGenerator(VALIDASI_KELAS, data)));
      } catch (error) {
        console.log(error, "<<<<<<<<<");
        throw error;
      }
    };
  };
  export const fetchDataKelas = () => {
    return async (dispatch) => {
      try {
        // localStorage.setItem("access_token", access_token);
        const token = localStorage.getItem("access_token"); 
        console.log(token,'ni log');// Ambil token dari localStorage
        const response = await fetch(BASE_URL + `/dataKelas`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
            // access_token: localStorage.getItem("access_token"),
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch absensi");
        }
        dispatch(actionGenerator(READ_DATA_KELAS, data));
      } catch (error) {
        console.log(error, "<<<<<<<<<");
        throw error;
      }
    };
  };
  export const AddDataByKelas = (data) => {
    // console.log(data);
    return async (dispatch) => {
      try {
        const token = localStorage.getItem("access_token"); 
        const response = await fetch(BASE_URL + "/dataKelas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
            access_token: localStorage.getItem("access_token"),
          },
          body: JSON.stringify(data),
        });
        dispatch(fetchDataKelas(), actionGenerator(POST_DATA_KELAS));
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
  };