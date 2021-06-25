import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NewMatch from './NewMatch';

const StyledLinks = styled.section`
  text-align: center;

  button {
    margin: 0 4px;
  }
`;

const AddMatchForm: React.FC = () => {
  return (
    <div>
      <StyledLinks>
        <Link to="/match/teams">
          <button>編輯隊伍</button>
        </Link>
        <Link to="/match/players">
          <button>編輯球員名單</button>
        </Link>
        <Link to="/matchType">
          <button>編輯賽事類型</button>
        </Link>
        <Link to="/matches">
          <button>返回</button>
        </Link>
      </StyledLinks>
      <NewMatch />
    </div>
  );
};

export default AddMatchForm;
