import marked from "marked";
import { Fragment, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { useWindowSize } from "use-hooks";
import { ImageFormatTypes } from "../types";
import { Colors, Dimens } from "../utils/constants";
import { getPost } from "../utils/selectors";

const Post: React.FC = () => {
  const { postId } = useParams<{ postId?: string }>();
  const post = useSelector(getPost(postId));
  const windowSize = useWindowSize();
  const postBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (post?.body && postBodyRef.current) {
      postBodyRef.current.innerHTML = marked(post.body);
    }
  }, [post]);

  return (
    <SuperContainer>
      <Container>
        {post && (
          <Fragment>
            {post.featuredImage?.formats?.[ImageFormatTypes.large].url && (
              <FeaturedImgContainer>
                <FeaturedImg
                  windowHeight={windowSize.height}
                  windowWidth={windowSize.width}
                  src={post.featuredImage.formats[ImageFormatTypes.large].url}
                />
              </FeaturedImgContainer>
            )}
            {post.title && <PostHeading>{post.title}</PostHeading>}
            {post.body && <PostBody ref={postBodyRef} />}
          </Fragment>
        )}
      </Container>
    </SuperContainer>
  );
};

export default Post;

const containerMaxWidth = 1000;

const SuperContainer = styled.div`
  flex: 1;
  overflow: auto;
  height: 100%;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: ${containerMaxWidth}px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const paddingDesktop = 30;
const paddingMobile = 20;

const FeaturedImgContainer = styled.div`
  width: 100%;
  padding: ${paddingDesktop}px;
  @media only screen and (max-width: ${Dimens.tabletMaxWidth}px) {
    padding: ${paddingMobile}px;
  }
`;

const FeaturedImg = styled.img<{ windowHeight: number; windowWidth: number }>`
  border-radius: ${Dimens.borderRadius}px;
  object-fit: cover;
  object-position: center;
  margin: 20px;
  height: ${(props) => props.windowHeight / 2}px;
  width: ${(props) =>
    Math.min(containerMaxWidth, props.windowWidth - Dimens.sidebar) -
    2 * paddingDesktop}px;
  @media only screen and (max-width: ${Dimens.tabletMaxWidth}px) {
    width: ${(props) =>
      props.windowWidth - Dimens.sidebar - 2 * paddingMobile}px;
    height: ${(props) => props.windowHeight / 4}px;
  }
  box-shadow: 0 0 5px hsl(208, 40%, 70%);
`;

const PostHeading = styled.div`
  font-size: 2rem;
  font-weight: 700;
  padding: 10px 30px;
  text-align: center;
`;

const PostBody = styled.div`
  font-size: 1.3rem;
  padding: 10px 30px;
  width: calc(100% - 60px);

  img {
    margin: 0 auto;
    width: 100%;
    box-shadow: 0 0 5px hsl(208, 40%, 70%);
  }

  p {
    margin: 40px;
  }

  a {
    color: ${Colors.secondary};
    text-decoration: none;
  }

  blockquote {
    border-left: 5px solid ${Colors.primary};
    padding: 20px;
  }

  blockquote p {
    margin: 0;
  }

  @media only screen and (max-width: ${Dimens.tabletMaxWidth}px) {
    font-size: 1.2rem;
    p {
      margin: 5px;
    }
    blockquote {
      margin: 10px;
    }
  }
`;
