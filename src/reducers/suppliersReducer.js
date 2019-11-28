import {
  GET_SUPPLIERS,
  ADD_SUPPLIER,
  GET_SUPPLIER,
  EDIT_SUPPLIER
} from "../actions/types";

const initialState = {
  suppliers: [],
  currentSupplier: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload
      };
    case GET_SUPPLIER:
      return {
        ...state,
        currentSupplier: action.payload
      };
    case ADD_SUPPLIER:
      return {
        ...state,
        suppliers: [action.payload, ...state.suppliers]
      };
    case EDIT_SUPPLIER:
      return {
        ...state,
        suppliers: state.suppliers.map(supplier =>
          supplier.id === action.payload.id ? action.payload : supplier
        )
      };

    default:
      return state;
  }
}
