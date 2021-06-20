import React from "react";
import styled from "styled-components";
import FrontPage from "./FrontPage";
import Sidebar from "../components/Sidebar";
import { NavigationObject } from "../types/props";
import { Colors } from "../utils/constants";
import { useWindowSize } from "use-hooks";
import { Redirect, Route, Switch } from "react-router";
import Experience from "./Experience";
import Projects from "./Projects";
import Blog from "./Blog";

interface Props {}

const Container: React.FC<Props> = () => {
  const windowSize = useWindowSize();

  const sidebarNavigationObjects: NavigationObject[] = [
    {
      emoji: "🏡",
      label: "Home",
      link: "/home",
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
    {
      emoji: "✍",
      label: "Blog",
      link: "/blog",
      component: <Blog />,
    },
  ];

  return (
    <AppContainer {...windowSize}>
      <Sidebar menuItems={sidebarNavigationObjects} />
      <Switch>
        {sidebarNavigationObjects.map((sidebarMenuItem) => (
          <Route key={sidebarMenuItem.label} path={sidebarMenuItem.link}>
            {sidebarMenuItem.component}
          </Route>
        ))}
        <Redirect path="/" to={sidebarNavigationObjects[0].link} />
      </Switch>
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
    background-color: ${Colors.secondaryBackground};
    border-radius: 5px;
  }
`;
