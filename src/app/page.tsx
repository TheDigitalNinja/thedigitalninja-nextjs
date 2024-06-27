import Header from "../components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="The Digital Ninja"/>
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold">The Digital Ninja</h1>
      </main>
    </div>
  );
}