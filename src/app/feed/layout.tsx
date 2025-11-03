import { Metadata } from 'next';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: 'Feed | The Digital Ninja',
  description: 'Short thoughts and updates from The Digital Ninja',
};

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <div className="flex flex-col w-full md:pl-64">
        <Header title="Feed"/>
        {children}
      </div>
    </div>
  );
}
