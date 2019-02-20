import * as React from 'react';
import styled from 'styled-components';

const RepoContainer = styled.div`
  &.active {
    background: yellow;
  }
  cursor: default;
`;

const Title = styled.h3`
  @media (max-width: 600px) {
    word-break: break-word;
  }
`;

export default function Repo(props) {
  return (
    <RepoContainer
      onClick={() =>
        props.handleRepoClick(props.repo.issues_url.slice(0, -9), props.repo.id)
      }
      className={props.className}
    >
      <Title>{props.repo.full_name}</Title>
    </RepoContainer>
  );
}
