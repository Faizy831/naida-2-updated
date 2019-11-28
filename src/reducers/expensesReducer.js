import {
  GET_EXPENSES,
  ADD_EXPENSE,
  GET_EXPENSE,
  EDIT_EXPENSE
} from "../actions/types";

const initialState = {
  expenses: [],
  currentExpense: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload
      };
    case GET_EXPENSE:
      return {
        ...state,
        currentExpense: action.payload
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [action.payload, ...state.expenses]
      };
    case EDIT_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === action.payload.id ? action.payload : expense
        )
      };

    default:
      return state;
  }
}
