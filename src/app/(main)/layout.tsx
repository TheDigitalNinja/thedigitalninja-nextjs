import type { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <div className="flex flex-col w-full md:pl-64">
        {children}
      </div>
    </div>
  );
}

