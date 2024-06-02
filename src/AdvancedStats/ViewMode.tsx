import { useState } from 'react';
import styled from 'styled-components';
import DisplayTable from './DisplayTable';
import { useStatsState } from './hooks/statData';

const StyledViewModeRoot = styled.div`
  text-align: center;
  padding-bottom: 28px;
`;

const StyledDisplayTable = styled.div`
  display: flex;
  justify-align: center;

  div {
    margin: auto;
  }
`;

interface Props {
  teamName: {
    HOME: string;
    AWAY: string;
  };
}

const ViewMode: React.FC<Props> = ({ teamName }: Props) => {
  const [filterValue, setFilterValue] = useState('');
  const { home } = useStatsState();
  const statNames = home.map((stat) => stat.statInfo.name);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>): void => setFilterValue(event.target.value);

  return (
    <StyledViewModeRoot>
      <select value={filterValue} onChange={handleFilterChange}>
        <option value="">全部</option>
        {statNames.map((name, index) => (
          <option key={`filter-select-option-${index}`} value={name}>
            {name}
          </option>
        ))}
      </select>
      <StyledDisplayTable>
        <DisplayTable team="home" teamName={teamName.HOME} filterValue={filterValue} />
      </StyledDisplayTable>
      <StyledDisplayTable>
        <DisplayTable team="away" teamName={teamName.AWAY} filterValue={filterValue} />
      </StyledDisplayTable>
    </StyledViewModeRoot>
  );
};

export default ViewMode;
