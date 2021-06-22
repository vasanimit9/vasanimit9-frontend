import dayjs from "dayjs";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addProjectsToStore,  } from "../api";
import Tag from "../components/Tag";
import { setProjects } from "../utils/actions";
import { Colors, Dimens, strings } from "../utils/constants";
import { getProjects } from "../utils/selectors";

const numberOfColumns = 3;

const Projects: React.FC = () => {
  const projects = useSelector(getProjects);

  const dispatch = useDispatch();

  useEffect(() => {
    if (projects.length !== 0) {
      return;
    }
    addProjectsToStore((projects) => dispatch(setProjects(projects)));
  }, [projects, dispatch]);

  return (
    <SuperContainer>
      <Container>
        {Array(Math.ceil(projects.length / numberOfColumns))
          .fill(0)
          .map((_, rowIndex) => (
            <CardContainer key={rowIndex}>
              {Array(numberOfColumns)
                .fill(0)
                .map((_, index) => {
                  const projectIndex = rowIndex * numberOfColumns + index;
                  if (projectIndex < projects.length) {
                    const project = projects[projectIndex];
                    return (
                      <Card key={index}>
                        <CardHeader>
                          {project.name && (
                            <ContentHeaderTitle>
                              {project.name}
                            </ContentHeaderTitle>
                          )}
                          {project.circa && (
                            <ContentHeaderSubtitle>
                              {dayjs(project.circa).format("MMM YYYY")}
                            </ContentHeaderSubtitle>
                          )}
                        </CardHeader>
                        {project.description && (
                          <ContentBody>{project.description}</ContentBody>
                        )}
                        {(project.repo || project.url) && (
                          <WebsiteLinkContainer>
                            {project.repo && (
                              <WebsiteLink
                                href={project.repo}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                {strings.repo}
                              </WebsiteLink>
                            )}
                            {project.repo && project.url && <br />}
                            {project.url && (
                              <WebsiteLink
                                href={project.url}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                {strings.demo}
                              </WebsiteLink>
                            )}{" "}
                          </WebsiteLinkContainer>
                        )}
                        {project.tags.length !== 0 && (
                          <TagsContainer>
                            {project.tags.map((tag) => (
                              <Tag key={tag.slug}>{tag.label}</Tag>
                            ))}
                          </TagsContainer>
                        )}
                      </Card>
                    );
                  } else {
                    return <Fragment key={index} />;
                  }
                })}
            </CardContainer>
          ))}
      </Container>
    </SuperContainer>
  );
};

export default Projects;

const SuperContainer = styled.div`
  flex: 1;
  overflow: auto;
  height: 100%;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center; ;
`;

const CardContainer = styled.div`
  align-self: stretch;
  display: flex;
  padding: 25px 0;
  width: 100%;
  @media only screen and (max-width: ${Dimens.tabletMaxWidth}px) {
    flex-direction: column;
    padding: 0;
  }
`;

const Card = styled.div`
  background-color: ${Colors.secondaryBackground};
  color: ${Colors.text};
  position: relative;
  border-radius: 6px;
  padding: 30px;
  overflow: hidden;
  margin: 0 25px;
  width: 200px;
  height: 275px;

  @media only screen and (max-width: ${Dimens.tabletMaxWidth}px) {
    padding: 20px;
    margin: 25px;
  }
`;

const CardHeader = styled.div`
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
