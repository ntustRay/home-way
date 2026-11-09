'use client'

import React, {ReactNode} from 'react';
import {ThemeProvider} from './theme-provider';
import {Toaster} from "@/components/ui/toaster";
import { SharedAuth } from "@/components/shared-auth";
const Providers = ({children, userId}: {children: ReactNode; userId: string | null}) => {
  return (
    <SharedAuth userId={userId}>
      <Toaster />
      <ThemeProvider
        attribute="class"
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SharedAuth>
  );
}

export default Providers;
