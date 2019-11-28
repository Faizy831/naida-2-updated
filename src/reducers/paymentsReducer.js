import {
  GET_PAYMENTS,
  ADD_PAYMENT,
  GET_PAYMENT,
  EDIT_PAYMENT
} from "../actions/types";

const initialState = {
  payments: [],
  currentPayment: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PAYMENTS:
      return {
        ...state,
        payments: action.payload
      };
    case GET_PAYMENT:
      return {
        ...state,
        currentPayment: action.payload
      };
    case ADD_PAYMENT:
      return {
        ...state,
        payments: [action.payload, ...state.payments]
      };
    case EDIT_PAYMENT:
      return {
        ...state,
        payments: state.payments.map(payment =>
          payment.id === action.payload.id ? action.payload : payment
        )
      };

    default:
      return state;
  }
}
