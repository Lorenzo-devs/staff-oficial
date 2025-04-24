import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #2c3e50;
  padding: 1rem;
  color: white;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #34495e;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Nav>
        <Logo>Registro de Carga Horária</Logo>
        <NavLinks>
          <NavLink to="/">Início</NavLink>
          <NavLink to="/members">Membros</NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
}

export default Header; 