import React from "react";
import styled from "styled-components";
import FrontPage from "./FrontPage";
import Sidebar from "../components/Sidebar";
import { NavigationObject } from "../types/props";
import { Colors } from "../utils/constants";
import { useWindowSize } from "use-hooks";
import { Route } from "react-router";
import Experience from "./Experience";
import Projects from "./Projects";

interface Props {}

const Container: React.FC<Props> = () => {
  const windowSize = useWindowSize();

  const navigationObjects: NavigationObject[] = [
    {
      emoji: "🏡",
      label: "Home",
      link: "/",
      component: <FrontPage />,
    },
    {
      emoji: "👷‍♂️",
      label: "Experience",
      link: "/experience",
      component: <Experience />,
    },
    {
      emoji: "💽",
      label: "Projects",
      link: "/projects",
      component: <Projects />,
    },
  ];

  return (
    <AppContainer {...windowSize}>
      <Sidebar menuItems={navigationObjects} />
      {navigationObjects.map((sidebarMenuItem) => (
        <Route key={sidebarMenuItem.label} path={sidebarMenuItem.link} exact>
          {sidebarMenuItem.component}
        </Route>
      ))}
    </AppContainer>
  );
};

export default Container;

const AppContainer = styled.div<{ height?: number; width?: number }>`
  height: ${(props) => (props.height ? `${props.height}px` : `100vh`)};
  width: ${(props) => (props.width ? `${props.width}px` : `100vw`)};
  background-color: ${Colors.background};
  display: flex;
  color: ${Colors.text};
  align-items: stretch;
  overflow: hidden;
  position: relative;

  div & ::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }

  div & ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  div & ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
  }
`;
