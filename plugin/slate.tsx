import slate from '@react-page/plugins-slate';
// import css as well. currently, we caannot do this here in the demo project and have moved that to _app.tsx
// see https://github.com/vercel/next.js/issues/19717
// import '@react-page/plugins-slate/lib/index.css';

import React from 'react';
import customSlatePlugin from './customSlatePlugin.tsx';

import styled from 'styled-components';
export const defaultSlate = slate((def) => ({
  ...def,
  plugins: {
    // this will pull in all predefined plugins
    ...def.plugins,
    // you can also add custom plugins. The namespace `custom` is just for organizing plugins
    custom: {
      custom1: customSlatePlugin,
    },
  },
}));


