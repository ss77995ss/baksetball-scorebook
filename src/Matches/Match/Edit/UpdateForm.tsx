import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { API_DOMAIN } from '../../constants';
import MatchTypeSelector from '../../AddMatchForm/MatchTypeSelector';
import TeamSelector from '../../AddMatchForm/TeamSelector';
import { MatchInfoType } from '../../types';

type MatchType = {
  matchId: string;
  typeId: string;
  name: string;
  homeTeamId: string;
  awayTeamId: string;
  date: Date;
};

interface Props {
  matchInfo: MatchInfoType;
  setMode: React.Dispatch<React.SetStateAction<'view' | 'edit'>>;
}

const UpdateForm: React.FC<Props> = ({ matchInfo, setMode }: Props) => {
  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useState(new Date(matchInfo.date));
  const { isLoading, isError, mutate } = useMutation(
    (formData: MatchType) =>
      fetch(`${API_DOMAIN}/matches`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('matches');
        setMode('view');
      },
    },
  );
  const { register, handleSubmit } = useForm<MatchType>({
    defaultValues: {
      typeId: matchInfo.type._id,
      name: matchInfo.name || '',
      homeTeamId: matchInfo.homeTeam._id,
      awayTeamId: matchInfo.awayTeam._id,
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Something went wrong</div>;

  const onSubmit = (newMatch: MatchType): void => {
    if (window.confirm(`修改比賽資訊： ${newMatch.name}?`)) {
      mutate({
        ...newMatch,
        matchId: matchInfo._id,
        date: startDate,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MatchTypeSelector register={register('typeId')} />
        <div>
          <label htmlFor="name">比賽名稱：</label>
          <input {...register('name')} />
        </div>
        <TeamSelector defaultValue="台灣大學" register={register('homeTeamId')}>
          <label htmlFor="homeTeamId">主隊：</label>
        </TeamSelector>
        <TeamSelector register={register('awayTeamId')}>
          <label htmlFor="awayTeamId">客隊：</label>
        </TeamSelector>
        <div>
          <label htmlFor="date">日期：</label>
          <DatePicker name="date" selected={startDate} onChange={(date: Date) => setStartDate(date)} />
        </div>
        <div>
          <label htmlFor="matchModeBA">基本紀錄</label>
          <input id="matchModeBA" type="radio" value="basic" checked />
          <label htmlFor="matchModeAD">進階紀錄</label>
          <input id="matchModeAD" type="radio" value="advanced" />
        </div>
        <button type="submit" disabled={isLoading}>
          修改比賽資訊
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
