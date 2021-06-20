import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Switch, useRouteMatch, Route } from "react-router-dom";
import styled from "styled-components";
import { Colors, Dimens } from "../utils/constants";
import { getPosts } from "../utils/selectors";
import Tag from "../components/Tag";
import { fetchPosts } from "../api";
import { setPosts } from "../utils/actions";
import { ImageFormatTypes } from "../types";
import Post from "../components/Post";

const numberOfColumns = 3;

const Blog: React.FC = () => {
  const posts = useSelector(getPosts);
  const dispatch = useDispatch();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    if (posts.length !== 0) {
      return;
    }
    fetchPosts().then((posts) => dispatch(setPosts(posts)));
  }, [posts, dispatch]);

  return (
    <Switch>
      <Route exact path={path}>
        <SuperContainer>
          <Container>
            {Array(Math.ceil(posts.length / numberOfColumns))
              .fill(0)
              .map((_, rowIndex) => (
                <CardContainer key={rowIndex}>
                  {Array(numberOfColumns)
                    .fill(0)
                    .map((_, index) => {
                      const postIndex = rowIndex * numberOfColumns + index;
                      if (postIndex < posts.length) {
                        const post = posts[postIndex];
                        return (
                          <Card key={index} to={url + "/" + post.id}>
                            {post.featuredImage?.formats?.[
                              ImageFormatTypes.small
                            ]?.url && (
                              <CardImgContainer>
                                <CardImg
                                  src={
                                    post.featuredImage.formats[
                                      ImageFormatTypes.small
                                    ].url
                                  }
                                />
                              </CardImgContainer>
                            )}
                            {post.title && (
                              <CardHeader>
                                <ContentHeaderTitle>
                                  {post.title}
                                </ContentHeaderTitle>
                              </CardHeader>
                            )}
                            {post.tags.length !== 0 && (
                              <TagsContainer>
                                {post.tags.map((tag) => (
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
      </Route>
      <Route path={`${path}/:postId`}>
        <Post />
      </Route>
    </Switch>
  );
};

export default Blog;

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
  display: flex;
  padding: 25px 0;
  width: 100%;
  @media only screen and (max-width: ${Dimens.tabletMaxWidth}px) {
    flex-direction: column;
    padding: 0;
  }
`;

const Card = styled(Link)`
  text-decoration: none;
  background-color: ${Colors.secondaryBackground};
  color: ${Colors.text};
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  margin: 0 25px;
  width: 250px;
  height: 275px;
  @media only screen and (max-width: ${Dimens.tabletMaxWidth}px) {
    margin: 25px;
  }
`;

const CardHeader = styled.div`
  color: ${Colors.text};
  padding: 10px 20px 0;
`;

const ContentHeaderTitle = styled.div`
  margin-bottom: 10px;
  font-size: 1.1rem;
  font-weight: 700;
`;

const CardImgContainer = styled.div`
  height: 50%;
  width: 100%;
  overflow: hidden;
`;

const CardImg = styled.img`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
`;

const TagsContainer = styled.div`
  margin-top: 10px;
  padding: 0 20px 10px;
`;
