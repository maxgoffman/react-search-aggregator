import React from 'react';
import { render } from '@testing-library/react';
import { Loading } from './LoadingComponent';

test('Check if Font Awesome Icon is rendered', () => {
  const { getByTestId } = render(<Loading />);
  const svgElement = getByTestId('fontAwesomeLoadingIcon');
  expect(svgElement).toBeInTheDocument();
});
