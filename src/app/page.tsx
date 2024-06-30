import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head> 
        <link rel="canonical" href="https://TheDigital.Ninja" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header title="The Digital Ninja"/>
        <div className="flex flex-1">
          <Sidebar />

          <main className="flex-1 p-4">
            <div className="flex items-center justify-center h-full">
              <h1 className="text-4xl font-bold">The Digital Ninja</h1>
            </div>
          </main>
          
        </div>
      </div>
    </>
  );
}