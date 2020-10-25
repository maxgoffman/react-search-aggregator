import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('Check main component interactions', async () => {
  const { getByTestId, getAllByTestId } = render(<App />);
  const queryInput = getByTestId('queryInput');
  expect(queryInput).toBeInTheDocument();
  const selectInput = getByTestId('selectInput');
  expect(selectInput.value).toBe('Both')
  const submitButton = getByTestId('submitButton');
  expect(submitButton).toBeInTheDocument();
  fireEvent.change(queryInput, { target: { value: 'Peppa' } })
  expect(queryInput.value).toBe('Peppa')
  fireEvent.click(submitButton)
  const [loadingIcons] = getAllByTestId('fontAwesomeLoadingIcon');
  expect(loadingIcons).toBeInTheDocument();
});
