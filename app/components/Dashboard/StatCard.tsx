'use client';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    positive: boolean;
  };
  bgColor?: string;
};

const StatCard = ({ title, value, icon, change, bgColor = "#fff" }: StatCardProps) => {
  return (
    <div style={{
      backgroundColor: bgColor,
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      minWidth: '250px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', color: '#555', fontWeight: 'normal' }}>{title}</h3>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          backgroundColor: '#D6E6FF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {icon}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#333' }}>{value}</h2>
        {change && (
          <div style={{
            marginLeft: '10px',
            fontSize: '14px',
            color: change.positive ? '#4CAF50' : '#F44336',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span>{change.positive ? '↑' : '↓'}</span>
            <span style={{ marginLeft: '2px' }}>{change.value}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard; 