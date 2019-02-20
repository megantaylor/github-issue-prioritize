import * as React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 5px;
  border: 1px solid black;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: 1px solid black;
  border-left: none;
  background: white;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
`;

export default function Form(props) {
  return (
    <form onSubmit={e => props.handleSubmit(e)}>
      <Input
        type='text'
        onChange={props.handleChange}
        value={props.apiKey}
        placeholder='GitHub API Key'
        required
      />
      <Button type='submit'>Submit</Button>
    </form>
  );
}
