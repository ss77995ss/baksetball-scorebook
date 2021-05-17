import styled from 'styled-components';
import { useMatchTypes } from '../hooks/useAPI';
import Type from './Type';
import NewType from './NewType';

const StyledSection = styled.section`
  text-align: center;

  button {
    margin: 4px;
  }

  input {
    margin-right: 4px;
  }
`;

const MatchType: React.FC = () => {
  const { isLoading, error, matchTypes } = useMatchTypes();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  if (!matchTypes || matchTypes.length < 0) return <div>尚無資料</div>;

  return (
    <StyledSection>
      <NewType matchTypes={matchTypes} />
      {matchTypes.map((type) => (
        <Type key={`match-type-${type._id}`} matchType={type} />
      ))}
    </StyledSection>
  );
};

export default MatchType;
