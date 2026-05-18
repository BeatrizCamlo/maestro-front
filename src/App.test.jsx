import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('renderiza a tela de login', async () => {
  render(<App />);
  
  const loginButton = await screen.findByRole('button', { name: /login/i });
  
  expect(loginButton).toBeDefined();
});