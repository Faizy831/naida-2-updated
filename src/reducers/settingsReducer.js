import { GET_PRESETS, GET_ALERTS } from "../actions/types";

const initialState = {
  presets: {},
  settings: {},
  alerts: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRESETS:
      return {
        ...state,
        presets: action.payload
      };
    case GET_ALERTS:
      return {
        ...state,
        alerts: action.payload
      };
    default:
      return state;
  }
}
