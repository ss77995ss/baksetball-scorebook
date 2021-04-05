import { useQuery } from 'react-query';

type Match = {
  _id: string;
  type: string | null;
  name: string | null;
  homeTeamId: string | null;
  awayTeamId: string | null;
  date: Date;
};

const Matches: React.FC = () => {
  const { isLoading, error, data: matches } = useQuery<Match[]>('matches', () =>
    fetch('http://localhost:8080/matches').then((res) => res.json()),
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{`An error has occurred: ${error}`}</div>;

  if (!matches) return <div>暫無資料</div>;

  return (
    <div>
      {matches.length > 0 && (
        <ul>
          {matches.map(({ _id, type, name, date }) => (
            <li key={`match-${_id}`}>
              <div>{name}</div>
              <div>{type}</div>
              <div>{date}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Matches;
