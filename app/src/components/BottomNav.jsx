import React from 'react';

const BottomNav = ({ active, navigate }) => {
  const items = [
    { id: 's-home', icon: '⊞', label: '홈' },
    { id: 's-main', icon: '💬', label: '채팅' },
    { id: 's-calendar', icon: '📅', label: '캘린더' },
    { id: 's-search', icon: '🔍', label: '검색' },
    { id: 's-profile', icon: '👤', label: '내정보' },
  ];
  return (
    <div className="bottom-nav">
      {items.map(item => (
        <div
          key={item.id}
          className={`bnav-item${active === item.id ? ' active' : ''}`}
          onClick={() => navigate(item.id)}
        >
          <div className="bnav-icon">{item.icon}</div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;
