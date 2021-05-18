import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TeamType } from '../types';
import { API_DOMAIN } from '../constants';
import MatchTypeSelector from './MatchTypeSelector';

type MatchType = {
  typeId: string;
  name: string;
  homeTeamId: string;
  awayTeamId: string;
  date: Date;
};

const StyledSection = styled.section`
  text-align: center;

  margin-top: 8px;

  div {
    margin: 4px 0;
  }
`;

const NewMatch: React.FC<{ teams: TeamType[] }> = ({ teams }: { teams: TeamType[] }) => {
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const { isLoading, isError, mutate } = useMutation(
    (formData: MatchType) =>
      fetch(`${API_DOMAIN}/matches`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: () => {
        history.push('/matches');
      },
    },
  );
  const { register, handleSubmit } = useForm();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Something went wrong</div>;

  if (!teams) return null;

  const onSubmit = (newMatch: MatchType): void => {
    if (window.confirm(`新增新比賽： ${newMatch.name}？`)) {
      mutate({
        ...newMatch,
        date: startDate,
      });
    }
  };

  return (
    <StyledSection>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MatchTypeSelector register={register('typeId')} />
        <div>
          <label htmlFor="name">比賽名稱：</label>
          <input {...register('name')} />
        </div>
        <div>
          <label htmlFor="homeTeamId">主隊：</label>
          <select {...register('homeTeamId')}>
            {teams.map((team) => (
              <option key={team._id} value={team._id} selected={team.name === '台灣大學'}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="awayTeamId">客隊：</label>
          <select {...register('awayTeamId')}>
            {teams.map((team) => (
              <option key={team._id} value={team._id} selected={team.name === '無'}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date">日期：</label>
          <DatePicker name="date" selected={startDate} onChange={(date: Date) => setStartDate(date)} />
        </div>
        <div>
          <label htmlFor="matchModeBA">基本紀錄</label>
          <input {...register('mode')} id="matchModeBA" type="radio" value="basic" checked />
          <label htmlFor="matchModeAD">進階紀錄</label>
          <input {...register('mode')} id="matchModeAD" type="radio" value="advanced" disabled />
        </div>
        <button type="submit">送出</button>
      </form>
    </StyledSection>
  );
};

export default NewMatch;
