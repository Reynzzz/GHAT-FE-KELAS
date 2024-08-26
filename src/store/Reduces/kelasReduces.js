// categoryProducts.js

import { READ_DATA_KELAS} from "../actionTypes";

const initialState = {
  kelas: [],
};

const kelasSchedule = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_DATA_KELAS:
      return {
        ...state,
        kelas: payload,
      };
    default:
      return state;
  }
};

export default kelasSchedule;
