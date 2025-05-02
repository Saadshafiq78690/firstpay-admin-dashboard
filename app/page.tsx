'use client';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/Dashboard/StatCard';
import TransactionsChart from './components/Dashboard/TransactionsChart';
import RecentTransactions from './components/Dashboard/RecentTransactions';
import { FiUsers, FiDollarSign, FiCreditCard, FiActivity, FiFileText } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="main-content">
        <Header />
        
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>Dashboard Overview</h2>
        
        <div className="responsive-stats">
          <StatCard 
            title="Total Users" 
            value="15,892" 
            icon={<FiUsers size={24} color="#2D64D8" />} 
            change={{ value: 12.5, positive: true }}
          />
          <StatCard 
            title="Total Transactions" 
            value="254,329" 
            icon={<FiActivity size={24} color="#4CAF50" />} 
            change={{ value: 8.2, positive: true }}
          />
          <StatCard 
            title="Transaction Value" 
            value="$1,254,890" 
            icon={<FiDollarSign size={24} color="#F44336" />} 
            change={{ value: 5.1, positive: true }}
          />
          <StatCard 
            title="Active Wallets" 
            value="9,875" 
            icon={<FiCreditCard size={24} color="#FFC107" />} 
            change={{ value: 3.8, positive: false }}
          />
          <StatCard 
            title="Pending KYC" 
            value="32" 
            icon={<FiFileText size={24} color="#2D64D8" />} 
            change={{ value: 12.8, positive: false }}
          />
        </div>
        
        <TransactionsChart />
        
        <RecentTransactions />
      </div>
    </div>
  );
} 