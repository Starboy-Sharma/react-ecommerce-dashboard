import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { localStorageColorSchemeManager, MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRoute.tsx';
import darkTheme from './theme/theme.ts';

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'user-color-preference',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider
      theme={darkTheme}
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme="dark"
    >
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
);
