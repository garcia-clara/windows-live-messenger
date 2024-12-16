import React, { useState } from 'react';
import dancing_pig from '/assets/winks/dancing_pig/dancing_pig.swf?url';

const TestWink = () => {
  const [hasPlayed, setHasPlayed] = useState(false);

  const handleClick = () => {
    // Set the state to true when the button is clicked to indicate the animation has been played
    if (!hasPlayed) {
      setHasPlayed(true);
    }
  };

  return (
    <div>
      <button 
        className='bg-slate-500 p-4 m-4 rounded-lg shadow-sm'
        onClick={handleClick}
        disabled={hasPlayed} // Disable button after playing the animation once
      >
        Try it!
      </button>
      <div>
        {/* Only render the object if hasPlayed is false */}
        {!hasPlayed && (
          <object 
            data={dancing_pig} 
            type="application/x-shockwave-flash" 
            width="500" 
            height="500"
          >
            <param name="movie" value={dancing_pig} />
          </object>
        )}
      </div>
    </div>
  );
}

export default TestWink;
