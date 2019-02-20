import * as React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const IssueContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid black;
  margin-bottom: 20px;
  padding: 10px;
  background: white;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 20px;
`;

const Title = styled.h4`
  display: inline-block;
  margin: 0;
  width: calc(100% - 60px);
  word-break: break-word;
  @media (max-width: 600px) {
    width: 100%;
    display: block;
    margin-top: 16px;
  }
`;

const TitleNoImg = styled.h4`
  display: inline-block;
  margin: 0;
  width: 100%;
  word-break: break-word;
`;

const Timestamp = styled.p`
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 0;
`;

function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    let seconds = Math.round(elapsed / 1000);
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  } else if (elapsed < msPerHour) {
    let minutes = Math.round(elapsed / msPerMinute);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (elapsed < msPerDay) {
    let hours = Math.round(elapsed / msPerHour);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (elapsed < msPerMonth) {
    let days = Math.round(elapsed / msPerDay);
    return `approximately ${days} day${days > 1 ? 's' : ''} ago`;
  } else if (elapsed < msPerYear) {
    let years = Math.round(elapsed / msPerMonth);
    return `approximately ${years} month${years > 1 ? 's' : ''} ago`;
  } else {
    return (
      'approximately ' +
      Math.round(elapsed / msPerYear) +
      ` year${elapsed > 1 ? 's' : null} ago`
    );
  }
}

export default function Issue(props) {
  let createdDate = new Date(props.created_at);
  let updatedDate = timeDifference(new Date(), new Date(props.updated_at));

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {provided => (
        <IssueContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.assignee !== null ? (
            <Image src={props.assignee.avatar_url} alt='props.login' />
          ) : null}
          {props.assignee !== null ? (
            <Title>{props.title}</Title>
          ) : (
            <TitleNoImg>{props.title}</TitleNoImg>
          )}
          <Timestamp>Created: {createdDate.toLocaleDateString()}</Timestamp>
          <Timestamp>Updated: {updatedDate}</Timestamp>
        </IssueContainer>
      )}
    </Draggable>
  );
}
