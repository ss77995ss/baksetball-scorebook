import styled from 'styled-components';

export const StyledTable = styled.div`
  h3 {
    text-align: center;
  }

  p {
    text-align: left;
  }

  table {
    border-spacing: 0;
    border: 1px solid black;
    margin: auto;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }
`;

export const StyledCell = styled.div`
  font-weight: bold;
  padding: 4rem;
  user-select: none;
  text-align: center;

  @media (min-width: 600px) and (max-width: 900px) {
    padding: 2.5rem;
  }

  @media (max-width: 600px) {
    padding: 0.75rem;
  }
`;

export const StyledTitleCell = styled.div`
  text-align: center;
`;

export const TitleNameInput = styled.button`
  text-align: center;
  width: 50%;
`;

export const StyledDisplayCell = styled.div`
  text-align: center;
  padding: 2rem;

  @media (min-width: 600px) and (max-width: 900px) {
    padding: 1.5rem;
  }

  @media (max-width: 600px) {
    padding: 0.15rem;
  }
`;
