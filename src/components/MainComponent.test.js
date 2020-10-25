import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('Check main component interactions', async () => {
  const { getByTestId, getAllByTestId } = render(<App />);
  //check if query input exists
  const queryInput = getByTestId('queryInput');
  expect(queryInput).toBeInTheDocument();
  //check the default value of search engine select
  const selectInput = getByTestId('selectInput');
  expect(selectInput.value).toBe('Both')
  //check if submit button exists
  const submitButton = getByTestId('submitButton');
  expect(submitButton).toBeInTheDocument();
  //check if query input value changed
  fireEvent.change(queryInput, { target: { value: 'Peppa' } })
  expect(queryInput.value).toBe('Peppa')
  //check what happens when we submit
  fireEvent.click(submitButton)
  const [loadingIcons] = getAllByTestId('fontAwesomeLoadingIcon');
  expect(loadingIcons).toBeInTheDocument();
});
