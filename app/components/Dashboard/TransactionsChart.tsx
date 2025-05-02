'use client';

import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TransactionsChart = () => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'USD Transactions',
        data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 85, 90],
        borderColor: '#2D64D8',
        backgroundColor: 'rgba(45, 100, 216, 0.2)',
        tension: 0.4,
      },
      {
        label: 'ZWL Transactions',
        data: [28, 48, 40, 19, 86, 27, 90, 85, 70, 60, 44, 35],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        tension: 0.4,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Transaction Volume',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginTop: '24px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>Transactions Overview</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setChartType('line')}
            style={{
              padding: '6px 12px',
              backgroundColor: chartType === 'line' ? '#2D64D8' : '#f5f5f5',
              color: chartType === 'line' ? 'white' : '#555',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Line
          </button>
          <button 
            onClick={() => setChartType('bar')}
            style={{
              padding: '6px 12px',
              backgroundColor: chartType === 'bar' ? '#2D64D8' : '#f5f5f5',
              color: chartType === 'bar' ? 'white' : '#555',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Bar
          </button>
        </div>
      </div>
      
      <div style={{ height: '400px' }}>
        {chartType === 'line' ? (
          <Line options={options} data={data} />
        ) : (
          <Bar options={options} data={data} />
        )}
      </div>
    </div>
  );
};

export default TransactionsChart; 