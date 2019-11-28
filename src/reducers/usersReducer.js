import {
  GET_USERS,
  GET_TEAM_MEMBERS,
  ADD_TEAM_MEMBER,
  GET_TEAM_MEMBER,
  UPDATE_TEAM_MEMBER
} from "../actions/types";

const initialState = {
  users: [],
  team: [],
  currentMember: null
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case ADD_TEAM_MEMBER:
      return {
        ...state,
        team: [action.payload, ...state.team]
      };
    case GET_TEAM_MEMBERS:
      return {
        ...state,
        team: action.payload
      };
    case GET_TEAM_MEMBER:
      return {
        ...state,
        currentMember: action.payload
      };
    case UPDATE_TEAM_MEMBER:
      return {
        ...state,
        team: state.team.map(member =>
          member.id === action.payload.id ? action.payload : member
        )
      };

    default:
      return state;
  }
}
