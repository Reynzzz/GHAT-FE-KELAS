// categoryProducts.js

import { READ_SCHEDULE_BY_KELAS} from "../actionTypes";

const initialState = {
  validasiKelas: [],
};

const validasiKelasSchedule = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_SCHEDULE_BY_KELAS:
      return {
        ...state,
        validasiKelas: payload,
      };
    default:
      return state;
  }
};

export default validasiKelasSchedule;
