import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders header component', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const headerElement = screen.getByText(/서버에서 주식 데이터를 받아오고 있습니다/i);
  expect(headerElement).toBeInTheDocument();
});
