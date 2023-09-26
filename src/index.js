import React, { lazy, Suspense, } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import MainLayout from './components/Layout';
import { Spin } from 'antd';
import ProtectedRoute from './components/ProtectedRout';
import Layout_Classeur from './components/Layout_classeur';

const Login = lazy(() => import('./pages/login/Login'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Contratheque = lazy(() => import('./pages/contratheque/Contrathek'));
const NouveauContrat = lazy(() => import('./pages/contrats/NouveauContrat'));
const Administration = lazy(() => import('./pages/administration/Administration'));
const Classeur = lazy(() => import('./pages/classeur/Classeur'));



const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Suspense fallback={<Spin size="large" />}>
          <Routes>
            <Route path="/" element={<ProtectedRoute component={Login} />} />
            <Route
              path="/dashboard/"
              element={
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<ProtectedRoute component={Dashboard} />} />
                  </Routes>
                </MainLayout>
              }
            />
            <Route
              path="/contratheque/"
              element={
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<ProtectedRoute component={Contratheque} />} />
                  </Routes>
                </MainLayout>
              }
            />
            <Route
              path="/nouveaucontrat/"
              element={
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<ProtectedRoute component={NouveauContrat} />} />
                  </Routes>
                </MainLayout>
              }
            />
            <Route
              path="/administration/"
              element={
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<ProtectedRoute component={Administration} />} />
                  </Routes>
                </MainLayout>
              }
            />
            <Route
              path="/classeur/"
              element={
                <Layout_Classeur>
                  <Routes>
                    <Route path="/" element={<ProtectedRoute component={Classeur} />} />
                  </Routes>
                </Layout_Classeur>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
