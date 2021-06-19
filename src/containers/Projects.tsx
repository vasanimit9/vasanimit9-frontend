import dayjs from "dayjs";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchProjects } from "../api";
import Tag from "../components/Tag";
import { setProjects } from "../utils/actions";
import { Colors, Dimens, strings } from "../utils/constants";
import { getProjects } from "../utils/selectors";

const numberOfColumns = 3;

const Projects: React.FC = () => {
  const projects = useSelector(getProjects);

  const dispatch = useDispatch();
  // @
  useEffect(() => {
    if (projects.length !== 0) {
      return;
    }
    fetchProjects().then((projects) => dispatch(setProjects(projects)));
  }, [projects, dispatch]);

  return (
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
                            >
                              {strings.repo}
                            </WebsiteLink>
                          )}
                          {project.repo && project.url && <br />}
                          {project.url && (
                            <WebsiteLink
                              href={project.url}
                              rel="noopener noreferrer"
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
                  return <Fragment key={index}></Fragment>;
                }
              })}
          </CardContainer>
        ))}
    </Container>
  );
};

export default Projects;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardContainer = styled.div`
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
  /* display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; */
`;

const WebsiteLink = styled.a`
  text-decoration: none;
  color: ${Colors.secondary};
`;
