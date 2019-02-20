import * as React from 'react';
import styled from 'styled-components';

import Repo from './Repo';

const List = styled.div`
  margin: 50px;
  @media (max-width: 600px) {
    margin: 50px 25px 50px 0;
  }
`;

const Header = styled.h2`
  text-decoration: underline;
`;

export default function RepoList(props) {
  return (
    <List>
      <Header>Select a repository to see a list of issues</Header>

      {props.repos.map(repo => (
        <Repo
          repo={repo}
          key={repo.id}
          handleRepoClick={props.handleRepoClick}
          className={props.selectedRepo === repo.id ? 'active' : null}
        />
      ))}
    </List>
  );
}
