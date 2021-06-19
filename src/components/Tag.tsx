import React from "react";
import styled from "styled-components";
import { Colors, Dimens } from "../utils/constants";

const Tag = React.memo((props: React.PropsWithChildren<{}>) => {
  return <TagSpan>{props.children}</TagSpan>;
});

export default Tag;

const TagSpan = styled.span`
  background-color: ${Colors.primary};
  padding: 2px 6px 1px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: ${Dimens.borderRadius}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.secondaryText};
`;
