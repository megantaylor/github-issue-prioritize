import * as React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Issue from './Issue';

const List = styled.div`
  margin: 50px;
  max-width: 35%;
  @media (max-width: 600px) {
    margin: 50px 0 50px 25px;
    max-width: none;
  }
`;

const Header = styled.h2`
  text-decoration: underline;
`;

export default function IssueList(props) {
  return (
    <List>
      <Header>Drag and drop the issues to reorder them</Header>
      <DragDropContext
        // onDragStart onDragUpdate
        onDragEnd={props.onDragEnd}
      >
        <Droppable droppableId={'droppable'}>
          {/* {props.issues.map(issue => (
             <Issue {...issue} key={issue.id} />
           ))}*/}
          {provided => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {props.issues.map((issue, index) => (
                  <Issue {...issue} key={issue.id} index={index} />
                ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </List>
  );
}
