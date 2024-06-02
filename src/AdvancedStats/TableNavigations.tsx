import styled from 'styled-components';
import { initialData } from './constants';

const StyledFlex = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  aligm-items: center;
  gap: 1rem;
`;

export const TableNavigations: React.FC = () => {
  return (
    <StyledFlex>
      {initialData.map((row) => {
        return (
          <a href={`#${row.statInfo.linkName}`} key={row.statInfo.linkName}>
            {row.statInfo.linkName}
          </a>
        );
      })}
    </StyledFlex>
  );
};
