import React from 'react';
import ReactDOM from 'react-dom/client';
import Todos from'../src/components/Todos';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Todos></Todos>
  </React.StrictMode>
);

