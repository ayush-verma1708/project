import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

// Create a QueryClient instance
const queryClient = new QueryClient();

// Create the root using createRoot
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Render the application inside the root
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import App from './App';
// import './index.css';

// // Create a QueryClient instance
// const queryClient = new QueryClient();

// ReactDOM.render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <App />
//     </QueryClientProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // import { StrictMode } from 'react';
// // import { createRoot } from 'react-dom/client';
// // import App from './App.tsx';
// // import './index.css';

// // createRoot(document.getElementById('root')!).render(
// //   <StrictMode>
// //     <App />
// //   </StrictMode>
// // );
