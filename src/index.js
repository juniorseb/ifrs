import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout';
import { Spin } from 'antd';

const Login = lazy(() => import('./pages/login/Login'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Contratheque = lazy(() => import('./pages/contratheque/Contrathek'));
const NouveauContrat = lazy(() => import('./pages/contrats/NouveauContrat'));


const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Suspense fallback={<Spin size="large" />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
            <Route path="/contratheque" element={<MainLayout><Contratheque /></MainLayout>} />
            <Route path="/nouveaucontrat" element={<MainLayout><NouveauContrat /></MainLayout>} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
