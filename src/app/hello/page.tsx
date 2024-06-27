import Header from "../../components/Header";

export const metadata = {
    title: 'Hello, World!',
  };

export default function HelloPage() {
  return (
    
      <div>
        <Header title={metadata.title}/>
        
        <h2>Hello, World!</h2>
        <p>This is a simple example page</p>
      </div>
  );
}