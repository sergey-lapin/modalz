import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('open and close close by esc', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

