import React, { useState, useEffect } from 'react';

const GreetingClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 12) return 'Bom dia';
    if (hour >= 12 && hour < 18) return 'Boa tarde';
    if (hour >= 18 && hour < 24) return 'Boa noite';
    return 'Boa madrugada';
  };

  const timeString = currentTime.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const dateString = currentTime.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).replace(/^\w/, (c) => c.toUpperCase()); // Capitalize first letter

  return (
    <div className="greeting-section">
      <h1>{getGreeting()}, Luan</h1>
      <div className="date">
        <span>{dateString}</span> • <span>{timeString}</span>
      </div>
    </div>
  );
};

export default GreetingClock;
