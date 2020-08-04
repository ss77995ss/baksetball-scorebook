import styled from 'styled-components';

export const StyledCell = styled.div`
  font-weight: bold;
  padding: 4rem;

  @media (min-width: 600px) and (max-width: 900px) {
    padding: 2.5rem;
  }

  @media (max-width: 600px) {
    padding: 1.2rem;
  }
`;
