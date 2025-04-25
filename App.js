import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Home from './pages/Home';
import MemberList from './pages/MemberList';
import MemberForm from './pages/MemberForm';
import HoursForm from './pages/HoursForm';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<MemberList />} />
          <Route path="/members/new" element={<MemberForm />} />
          <Route path="/hours/:memberId" element={<HoursForm />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App; 