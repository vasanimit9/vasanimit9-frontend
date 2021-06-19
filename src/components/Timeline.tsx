import React from "react";
import styled from "styled-components";
import { IExperience } from "../types";
import { Colors, Dimens } from "../utils/constants";
import dayjs from "dayjs";
import Tag from "./Tag";

interface Props {
  experiences: IExperience[];
}

const Timeline: React.FC<Props> = React.memo((props: Props) => {
  return (
    <ActualTimeline>
      {props.experiences.map((exp, index) => {
        const Cnt = index % 2 === 0 ? LeftContainer : RightContainer;
        return (
          <Cnt key={exp.id}>
            <Content>
              <ContentHeader>
                <ContentHeaderTitle>
                  {exp.organization?.name}
                </ContentHeaderTitle>
                <ContentHeaderSubtitle>
                  {exp.position},
                  <br />
                  {dayjs(exp.startDate).format("MMM YYYY")} -{" "}
                  {exp.endDate
                    ? dayjs(exp.endDate).format("MMM YYYY")
                    : "present"}
                </ContentHeaderSubtitle>
              </ContentHeader>
              {exp.description && <ContentBody>{exp.description}</ContentBody>}
              {exp.organization?.url && (
                <WebsiteLinkContainer>
                  <WebsiteLink href={exp.organization.url}>
                    {exp.organization.name} 👉
                  </WebsiteLink>
                </WebsiteLinkContainer>
              )}
              {exp.tags.length !== 0 && (
                <TagsContainer>
                  {exp.tags.map((tag) => (
                    <Tag key={tag.slug}>{tag.label}</Tag>
                  ))}
                </TagsContainer>
              )}
            </Content>
          </Cnt>
        );
      })}
    </ActualTimeline>
  );
});

export default Timeline;

const ActualTimeline = styled.div`
  position: relative;
  max-width: calc(100% - 25px);

  &::after {
    content: "";
    position: absolute;
    width: 6px;
    background-color: ${Colors.secondaryBackground};
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
  }

  @media only screen and (max-width: ${Dimens.tabletMaxWidth}px) {
    padding-left: 15px;
    &::after {
      left: 20px;
    }
  }
`;

const containerWidth = 390;
const mobileContainerWidth = 370;
const containerHorizontalPadding = 40;

const Container = styled.div`
  padding: 20px ${containerHorizontalPadding}px;
  position: relative;
  background-color: inherit;
  max-width: ${containerWidth - 2 * containerHorizontalPadding}px;

  &::after {
    content: "";
    position: absolute;
    width: 25px;
    height: 25px;
    right: -17px;
    background-color: ${Colors.secondaryBackground};
    border: 4px solid ${Colors.primary};
    top: 25px;
    border-radius: 50%;
    z-index: 1;
  }
  @media only screen and (max-width: ${Dimens.tabletMaxWidth}px) {
    max-width: ${mobileContainerWidth - 2 * containerHorizontalPadding}px;
  }
`;

const LeftContainer = styled(Container)`
  left: calc(50% - ${containerWidth}px);

  &::before {
    content: " ";
    height: 0;
    position: absolute;
    top: 32px;
    width: 0;
    z-index: 1;
    right: 31px;
    border: medium solid ${Colors.secondaryBackground};
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent
      ${Colors.secondaryBackground};
  }

  @media only screen and (max-width: ${Dimens.tabletMaxWidth}px) {
    left: 5px;

    &::after {
      left: -15px;
    }
    &::before {
      left: 31px;
      border: medium solid ${Colors.secondaryBackground};
      border-width: 10px 10px 10px 0;
      border-color: transparent ${Colors.secondaryBackground} transparent
        transparent;
    }
  }
`;

const RightContainer = styled(Container)`
  left: 50%;

  &::before {
    content: " ";
    height: 0;
    position: absolute;
    top: 32px;
    width: 0;
    z-index: 1;
    left: 31px;
    border: medium solid ${Colors.secondaryBackground};
    border-width: 10px 10px 10px 0;
    border-color: transparent ${Colors.secondaryBackground} transparent
      transparent;
  }

  &::after {
    left: -16px;
  }

  @media only screen and (max-width: ${Dimens.tabletMaxWidth}px) {
    left: 5px;
    &::before {
      left: 31px;
      border: medium solid ${Colors.secondaryBackground};
      border-width: 10px 10px 10px 0;
      border-color: transparent ${Colors.secondaryBackground} transparent
        transparent;
    }
  }
`;

const Content = styled.div`
  background-color: ${Colors.secondaryBackground};
  position: relative;
  border-radius: 6px;
  padding: 30px;
  overflow: hidden;
  @media only screen and (max-width: ${Dimens.tabletMaxWidth}px) {
    padding: 20px;
  }
`;

const ContentHeader = styled.div`
  color: ${Colors.text};
`;

const ContentHeaderTitle = styled.div`
  margin-bottom: 10px;
  font-size: 1.1rem;
  font-weight: 700;
`;

const ContentHeaderSubtitle = styled.div`
  font-size: 1.1rem;
`;

const ContentBody = styled.div`
  margin-top: 10px;
  color: ${Colors.text};
`;

const TagsContainer = styled.div`
  margin-top: 10px;
`;

const WebsiteLinkContainer = styled.div`
  margin-top: 10px;
`;

const WebsiteLink = styled.a`
  text-decoration: none;
  color: ${Colors.secondary};
`;
