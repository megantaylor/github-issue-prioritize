import * as types from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_REPOS:
      return {
        ...state,
        repos: action.payload.repos,
        apiKey: action.payload.apiKey
      };
    case types.FETCH_ISSUES:
      return {
        ...state,
        issues: action.payload.issues,
        selectedRepo: action.payload.selectedRepo
      };
    case types.MOVE_ISSUE:
      return {
        ...state,
        issues: action.payload.issues
      };
    default:
      return state;
  }
};
