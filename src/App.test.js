import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Check if Main Component is rendered', () => {
  const { getByText } = render(<App />);
  const mainInside = getByText('Please type in your search:');
  expect(mainInside).toBeInTheDocument();
});
