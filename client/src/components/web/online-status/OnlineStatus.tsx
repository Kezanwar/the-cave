import React from 'react';

interface OnlineStatusProps {
  isOnline: boolean;
}

const OnlineStatus: React.FC<OnlineStatusProps> = ({ isOnline }) => {
  return (
    <div className="relative w-2 h-2">
      <span
        className={`absolute top-0 left-0 w-2 h-2 rounded-full ${
          isOnline ? 'bg-green-500' : 'bg-gray-400'
        } shadow-md `}
      />
    </div>
  );
};

export default OnlineStatus;
