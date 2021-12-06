import React from 'react';

const Die = props => {
  const { die, handleHold } = props;

  return (
    <div className={'die ' + (die.isHeld && 'activeDie')} onClick={handleHold}>
      <h2>{die.value}</h2>
    </div>
  );
};

export default Die;
