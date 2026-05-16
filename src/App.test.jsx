import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import App from './App';

test('renderiza a tela de login', async () => {
  render(<App />);
  expect(await screen.findByRole('button', { name: /login/i })).toBeInTheDocument();
});
