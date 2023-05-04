import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout';

const Login = lazy(() => import('./pages/login/Login'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Contratheque = lazy(() => import('./pages/contratheque/Contrathek'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Chargement...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/contratheque" element={<MainLayout><Contratheque /></MainLayout>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
