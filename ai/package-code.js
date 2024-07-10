const fs = require('fs');
const path = require('path');

const filesToCopy = [
    { dest: 'home-page.tsx',        src: 'src/app/page.tsx' },
    { dest: 'blog-post-page.tsx',   src: 'src/app/blog/[slug]/page.tsx' },
    { dest: 'Sidebar.tsx',          src: 'src/components/Sidebar.tsx' },
    { dest: 'posts.ts',             src: 'src/lib/posts.ts' },
    { dest: 'useAuth.ts',           src: 'src/hooks/useAuth.ts' },
    { dest: 'AuthProvider.tsx',     src: 'src/components/AuthProvider.tsx' },
    { dest: 'tailwind.config.ts',   src: 'tailwind.config.ts' },
    { dest: 'next.config.js',       src: 'next.config.mjs' },
    { dest: 'package.json',         src: 'package.json' },
    { dest: 'root-layout.tsx',      src: 'src/app/layout.tsx' },
    { dest: 'README.md',            src: 'README.md' },
    { dest: 'Header.tsx',           src: 'src/components/Header.tsx' },
    { dest: 'about-page.tsx',       src: 'src/app/about/page.tsx' },
    { dest: 'first-post.md',        src: 'posts/first-post.md' },
];

const uploadDir = path.join(__dirname, 'upload');

// Create the upload directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

filesToCopy.forEach(file => {
  const srcPath = path.join(process.cwd(), file.src);
  const destPath = path.join(uploadDir, file.dest);

  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file.src} to ${destPath}`);
  } catch (err) {
    console.error(`Error copying ${file.src}: ${err.message}`);
  }
});

console.log('File packaging complete!');