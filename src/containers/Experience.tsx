import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchExperiences } from "../api";
import Timeline from "../components/Timeline";
import { setExperiences } from "../utils/actions";
import { getExperiences } from "../utils/selectors";

const Experience: React.FC = () => {
  const experiences = useSelector(getExperiences);

  const dispatch = useDispatch();

  useEffect(() => {
    if (experiences.length !== 0) {
      return;
    }
    fetchExperiences().then((experiences) =>
      dispatch(setExperiences(experiences))
    );
  }, [experiences, dispatch]);

  return (
    <Container>
      <Timeline experiences={experiences} />
    </Container>
  );
};

export default Experience;

const Container = styled.div`
  flex: 1;
  overflow: auto;
`;
