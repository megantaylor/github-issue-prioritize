import * as types from './types';
import axios from 'axios';

export const fetchRepos = (apiKey, repos) => {
  return {
    type: types.FETCH_REPOS,
    payload: {
      repos: repos,
      apiKey: apiKey
    }
  };
};

export const submitApiKey = apiKey => {
  return dispatch => {
    return axios
      .get(`https://api.github.com/user/repos?access_token=${apiKey}`)
      .then(response => {
        dispatch(fetchRepos(apiKey, response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const fetchIssues = (issues, id) => {
  return {
    type: types.FETCH_ISSUES,
    payload: { issues: issues, selectedRepo: id }
  };
};

export const fetchAllIssues = (apiKey, url, id) => {
  return dispatch => {
    return axios
      .get(`${url}?access_token=${apiKey}`)
      .then(response => {
        dispatch(fetchIssues(response.data, id));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const moveIssue = (
  issues,
  sourceIndex,
  destinationIndex,
  draggableId
) => {
  const newIssuesArray = Array.from(issues);
  const tempIssue = newIssuesArray.splice(sourceIndex, 1);
  newIssuesArray.splice(destinationIndex, 0, ...tempIssue);
  return {
    type: types.MOVE_ISSUE,
    payload: { issues: newIssuesArray }
  };
};
