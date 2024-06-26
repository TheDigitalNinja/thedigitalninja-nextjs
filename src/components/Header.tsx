export default function Header({ title }: { title: string }) {
    return (
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
      </header>
    );
  }