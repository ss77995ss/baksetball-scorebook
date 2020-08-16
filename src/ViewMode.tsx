import React from 'react';
import DisplayTable from './DisplayTable';

interface Props {
  teamName: {
    HOME: string;
    AWAY: string;
  };
}

const ViewMode: React.FC<Props> = ({ teamName }: Props) => {
  return (
    <div>
      <DisplayTable team="home" teamName={teamName.HOME} />
      <DisplayTable team="away" teamName={teamName.AWAY} />
    </div>
  );
};

export default ViewMode;
