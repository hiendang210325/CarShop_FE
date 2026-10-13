import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { storage } from '../../utils';
import { STORAGE_KEYS } from '../../constants';

export const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    return Boolean(storage.get<boolean>(STORAGE_KEYS.SIDEBAR_COLLAPSED, false));
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((prev) => !prev)} />

      {/* Main Body Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header />

        <main
          style={{
            flex: 1,
            padding: '24px 32px',
            maxWidth: '1600px',
            width: '100%',
            margin: '0 auto',
            boxSizing: 'border-box',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
