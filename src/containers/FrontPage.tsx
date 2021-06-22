import marked from "marked";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useWindowSize } from "use-hooks";
import { addFrontPageToStore } from "../api";
import { ImageFormatTypes } from "../types";
import { Dimens } from "../utils/constants";
import Tag from "../components/Tag";
import { getFrontPage } from "../utils/selectors";
import { setFrontPage } from "../utils/actions";

const FrontPage: React.FC = () => {
  const frontPage = useSelector(getFrontPage);
  const windowSize = useWindowSize();

  const descriptionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (descriptionRef.current && frontPage?.description) {
      descriptionRef.current.innerHTML = marked(frontPage.description);
    }
  }, [frontPage]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (frontPage) {
      return;
    }
    addFrontPageToStore((frontPage) => {
      dispatch(setFrontPage(frontPage));
    });
  }, [dispatch, frontPage]);

  return (
    <FrontPageContainer>
      <CoverImageContainer>
        {frontPage?.profilePicture?.formats?.[ImageFormatTypes.small]?.url ? (
          <CoverImg
            windowWidth={windowSize.width}
            src={frontPage.profilePicture.formats[ImageFormatTypes.small].url}
          />
        ) : (
          <CoverImagePlaceHolder windowWidth={windowSize.width} />
        )}
      </CoverImageContainer>
      <IntroContainer>
        <Heading>{frontPage?.heading}</Heading>

        <Description ref={descriptionRef} />

        {frontPage?.tags &&
          frontPage.tags.map((tag) => <Tag key={tag.slug}>{tag.label}</Tag>)}
      </IntroContainer>
    </FrontPageContainer>
  );
};

export default FrontPage;

const containerPadding = 20;
const imageMaxWidth = (windowWidth: number) =>
  windowWidth - 2 * containerPadding - Dimens.sidebar;

const FrontPageContainer = styled.div`
  flex: 1;
  display: flex;
  width: calc(100vw - ${Dimens.sidebar}px);
  padding: ${containerPadding}px;
  overflow: auto;
  @media only screen and (max-width: ${Dimens.mobileMaxWidth}px) {
    flex-direction: column;
  }
`;

const IntroContainer = styled.div`
  flex: 1;
  padding: 20px;
  @media only screen and (min-width: ${Dimens.mobileMaxWidth}px) {
    margin: auto 0;
  }
  font-size: 24px;
`;

const CoverImageContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const CoverImg = styled.img<{ windowWidth: number }>`
  width: ${(props) => Math.min(400, imageMaxWidth(props.windowWidth))}px;
  border-radius: 200px;
  margin: auto;
`;

const CoverImagePlaceHolder = styled.div<{ windowWidth: number }>`
  width: ${(props) => Math.min(400, imageMaxWidth(props.windowWidth))}px;
  height: ${(props) => Math.min(400, imageMaxWidth(props.windowWidth))}px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 200px;
  margin: auto;
`;

const Heading = styled.div`
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Description = styled.div`
  margin-bottom: 16px;
  font-size: 1.5rem;
`;
