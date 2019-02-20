import React from 'react';
import Repo from './Repo';
import renderer from 'react-test-renderer';

it('renders inactive repo correctly', () => {
  const tree = renderer
    .create(<Repo repo={{ full_name: 'repo title' }} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders active repo correctly', () => {
  const tree = renderer
    .create(<Repo repo={{ full_name: 'repo title' }} className='active' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
