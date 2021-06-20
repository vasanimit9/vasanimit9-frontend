import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { NavigationObject } from "../types/props";
import { Colors, Dimens } from "../utils/constants";

interface Props {
  menuItems: NavigationObject[];
}

const Sidebar: React.FC<Props> = React.memo((props: Props) => {
  return (
    <SidebarContainer>
      {props.menuItems.map((menuItem) => (
        <MenuItemContainer
          to={menuItem.link}
          key={menuItem.label}
          activeStyle={{ backgroundColor: Colors.primary }}
        >
          {menuItem.emoji}
        </MenuItemContainer>
      ))}
    </SidebarContainer>
  );
});

export default Sidebar;

const SidebarContainer = styled.div`
  width: ${Dimens.sidebar}px;
  display: flex;
  flex-direction: column;
  border-width: 0px;
  align-items: center;
  box-shadow: 0 0 5px hsl(208, 40%, 70%);
`;

const menuItemSize = Dimens.sidebar - 16;

const MenuItemContainer = styled(NavLink)`
  margin: 10px;
  height: ${menuItemSize}px;
  width: ${menuItemSize}px;
  border-radius: ${Dimens.borderRadius}px;
  color: ${Colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  text-decoration: none;

  :hover {
    background-color: ${Colors.secondaryBackground};
  }
`;
