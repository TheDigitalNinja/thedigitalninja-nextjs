import type { ReactNode } from 'react';
import Header from './Header';

type PageLayoutProps = {
  title: string;
  useH1?: boolean;
  children: ReactNode;
  mainClassName?: string;
};

const baseMainClasses = 'flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12';

export default function PageLayout({
  title,
  useH1 = true,
  children,
  mainClassName,
}: PageLayoutProps) {
  return (
    <>
      <Header title={title} useH1={useH1} />
      <main className={mainClassName ? `${baseMainClasses} ${mainClassName}` : baseMainClasses}>
        {children}
      </main>
    </>
  );
}

