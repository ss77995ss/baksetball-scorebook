import { useHistory } from 'react-router-dom';

const GoBackBtn: React.FC = () => {
  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  };
  return <button onClick={handleBack}>返回前一頁</button>;
};

export default GoBackBtn;
