import React from 'react';
import DisplayTable from './DisplayTable';
import TurnoverCategoriesSelector from './TurnoverCategoriesSelector';

const TurnoverSheet: React.FC = () => {
  return (
    <section>
      <TurnoverCategoriesSelector />
      <DisplayTable />
    </section>
  );
};

export default TurnoverSheet;
