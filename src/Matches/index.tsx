import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MatchInfoType } from './types';
import { API_DOMAIN } from './constants';
import { formatDate } from './utils';

const StyledLinks = styled.section`
  button {
    margin: 0 4px;
  }
`;

const StyledGridContainer = styled.section`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  padding-top: 4px;

  @media (max-width: 664px) {
    grid-template-columns: 50% 50%;
  }
`;

const StyledGridItem = styled.section`
  border: 1px solid black;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 4px;

  a {
    color: black;
    text-decoration: none;
  }

  :hover {
    background-color: gray;
  }
`;

const StyledFilter = styled.section`
  text-align: center;
`;

const Matches: React.FC = () => {
  const [searchMatch, setSearchMatch] = useState('');
  const { isLoading, error, data: matches } = useQuery<MatchInfoType[]>('matches', () =>
    fetch(`${API_DOMAIN}/matches`).then((res) => res.json()),
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMatch(event.target.value);
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{`An error has occurred: ${error}`}</div>;

  if (!matches) return <div>暫無資料</div>;

  return (
    <div>
      <StyledLinks>
        <Link to="/match/add">
          <button>新增比賽</button>
        </Link>
      </StyledLinks>
      <StyledFilter>
        <label>搜尋：</label>
        <input onChange={handleSearch} />
      </StyledFilter>
      {matches.length > 0 && (
        <StyledGridContainer>
          {matches
            .filter(({ name }) => name?.includes(searchMatch))
            .map(({ _id, type, name, date }) => (
              <StyledGridItem key={`match-${_id}`}>
                <Link to={`/match/show/${_id}`}>
                  <div>{name}</div>
                  <div>{type.name}</div>
                  <div>{formatDate(new Date(date))}</div>
                </Link>
              </StyledGridItem>
            ))}
        </StyledGridContainer>
      )}
    </div>
  );
};

export default Matches;
