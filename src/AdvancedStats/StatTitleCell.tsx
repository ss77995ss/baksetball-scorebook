import { Cell } from 'react-table';
import { StatType } from './types';
import { lensProp, pick, set } from 'ramda';
import { StyledTitleCell } from '../styles';
import { useStatsDispatch } from './hooks/statData';

interface Props {
  cell: Cell<StatType>;
}

const StatTitleCell: React.FC<Props> = ({ cell }: Props) => {
  const {
    value,
    row: { index },
    column: { id },
  } = cell;
  const { name, linkName, title } = value;

  const statsDispatch = useStatsDispatch();

  const updateStatsName: (
    value:
      | { count: number; points: number }
      | number
      | { name: string; title: string | { points: string; count: string } },
  ) => void = (value) => {
    statsDispatch({
      type: 'UPDATE_STATS_NAME',
      params: {
        team: '',
        rowIndex: index,
        columnId: id,
        value,
      },
    });
  };

  const handleOnClick = (key: string) => (): void => {
    const targetValue = typeof title === 'object' && key !== 'name' ? pick([key], title)[key] : pick([key], value)[key];
    const newKeyName = prompt('輸入新的名稱', targetValue) || targetValue;
    const targetLen = lensProp<Record<string, string>, string>(key);

    typeof title === 'object' && key !== 'name'
      ? updateStatsName({ ...value, title: set(targetLen, newKeyName, title) })
      : updateStatsName(set(targetLen, newKeyName, value));
  };

  return (
    <StyledTitleCell id={linkName}>
      <div onClick={handleOnClick('name')}>{name}</div>
      {typeof title === 'string' ? (
        <div onClick={handleOnClick('title')}>{title}</div>
      ) : (
        <div>
          <span onClick={handleOnClick('points')}>{title.points}</span>
          <span>/</span>
          <span onClick={handleOnClick('count')}>{title.count}</span>
        </div>
      )}
    </StyledTitleCell>
  );
};

export default StatTitleCell;
