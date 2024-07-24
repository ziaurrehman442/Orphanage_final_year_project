import React from 'react';

const Avatar = ({ firstName, lastName, size = 100, fontSize = 40 }) => {
  const initials = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundColor: '#eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: fontSize,
    fontWeight: 'bold',
    color: '#333',
    border: '2px solid #333',
  };

  return (
    <div style={avatarStyle}>
      {initials}
    </div>
  );
};

export default Avatar;