import React from 'react';
import { useLocalStorage } from 'react-use';

const PlayerList: React.FC = () => {
  const [value] = useLocalStorage<string[]>('playerList');

  return (
    <section>
      <ul>{value && value.map((player, index) => <li key={`${player}-${index}`}>{player}</li>)}</ul>
    </section>
  );
};

export default PlayerList;
