import {
  GET_CLIENTS,
  ADD_CLIENT,
  GET_CLIENT,
  EDIT_CLIENT
} from "../actions/types";

const initialState = {
  clients: [],
  currentClient: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload
      };
    case GET_CLIENT:
      return {
        ...state,
        currentClient: action.payload
      };
    case ADD_CLIENT:
      return {
        ...state,
        clients: [action.payload, ...state.clients]
      };
    case EDIT_CLIENT:
      return {
        ...state,
        clients: state.clients.map(client =>
          client.id === action.payload.id ? action.payload : client
        )
      };

    default:
      return state;
  }
}
