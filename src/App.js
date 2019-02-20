import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { submitApiKey, fetchAllIssues, moveIssue } from './actions/actions';
import Form from './components/Form';
import RepoList from './components/RepoList';
import IssuesList from './components/IssueList';

const Wrapper = styled.div`
  text-align: center;
  margin: 25px;
  font-family: Arial, Helvetica, sans-serif;
`;

const Results = styled.div`
  display: flex;
  justify-content: center;
  text-align: left;
`;

const NoIssues = styled.h4`
  margin: calc(60px + 0.83em);

  @media (max-width: 600px) {
    margin: calc(60px + 0.83em);
    margin-right: 0;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: this.props.github.apiKey || '',
      loading: false
    };
  }

  handleChange = event => {
    this.setState({ apiKey: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.submitApiKey(this.state.apiKey);
  };
  handleRepoClick = (url, id) => {
    this.props.fetchAllIssues(this.state.apiKey, url, id);
  };

  repoHasIssues = () => {
    if (this.props.github.issues) {
      if (this.props.github.issues.length > 0) {
        return (
          <IssuesList
            onDragEnd={this.onDragEnd}
            issues={this.props.github.issues}
          />
        );
      } else {
        return <NoIssues>There are no issues for this repo.</NoIssues>;
      }
    } else {
      return null;
    }
  };

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.index !== source.index) {
      return this.props.moveIssue(
        this.props.github.issues,
        source.index,
        destination.index,
        draggableId
      );
    }
  };

  render() {
    return (
      <Wrapper>
        <h1>Submit a GitHub API Key to see a list of repositories</h1>
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <Results>
          {this.props.github.repos ? (
            <RepoList
              repos={this.props.github.repos}
              selectedRepo={this.props.github.selectedRepo}
              handleRepoClick={this.handleRepoClick}
            />
          ) : null}
          {this.repoHasIssues()}
        </Results>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  submitApiKey: apiKey => dispatch(submitApiKey(apiKey)),
  fetchAllIssues: (apiKey, url, id) =>
    dispatch(fetchAllIssues(apiKey, url, id)),
  moveIssue: (issues, sourceIndex, destinationIndex, draggableId) =>
    dispatch(moveIssue(issues, sourceIndex, destinationIndex, draggableId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
