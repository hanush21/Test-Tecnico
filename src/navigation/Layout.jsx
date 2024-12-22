import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const Layout = ({ children }) => {
    return (
        <LayoutContainer>
            <Sidebar>
                <SidebarHeader>Tracking Sales</SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <StyledLink to="/">Inicio</StyledLink>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <StyledLink to="/products">Productos</StyledLink>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <StyledLink to="/stats">Estadísticas</StyledLink>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarFooter> <strong>Richard Hernandez</strong> </SidebarFooter>
            </Sidebar>
            <Content>{children}</Content>
        </LayoutContainer>
    );
};

export default Layout;


const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px; 
  background-color: #242424;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SidebarHeader = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #444;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const SidebarMenuItem = styled.li`
  padding: 15px 20px;
  border-bottom: 1px solid #444;
  &:hover {
    background-color: #1a1a1a;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  display: block;
  width: 100%;
  height: 100%;
`;

const SidebarFooter = styled.div`
  padding: 20px;
  font-size: 14px;
  text-align: center;
  border-top: 1px solid #444;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;
