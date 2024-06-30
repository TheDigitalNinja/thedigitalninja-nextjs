/**
 * @file src/app/hello/page.tsx
 * @fileoverview Experimental page component for The Digital Ninja website
 * @description This file serves as a sandbox for testing new ideas and components.
 *              It currently renders a simple "Hello, World!" page with a header.
 *              This page may be frequently modified and is not intended for production use.
 * 
 * @component HelloPage
 * @returns {JSX.Element} A basic page structure for experimentation
 */

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