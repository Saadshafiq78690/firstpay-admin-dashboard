'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FiUsers, FiDollarSign, FiActivity, FiCreditCard, FiTrendingUp, FiTrendingDown, FiInfo } from 'react-icons/fi';

// Sample analytics data
const analyticsData = {
  users: {
    total: 15892,
    active: 9248,
    newThisMonth: 425,
    growth: 12.5,
    byCountry: [
      { country: 'Zimbabwe', count: 9536, percentage: 60 },
      { country: 'South Africa', count: 2702, percentage: 17 },
      { country: 'Botswana', count: 1748, percentage: 11 },
      { country: 'Zambia', count: 955, percentage: 6 },
      { country: 'Other', count: 951, percentage: 6 }
    ],
    byAge: [
      { group: '18-24', count: 3973, percentage: 25 },
      { group: '25-34', count: 6357, percentage: 40 },
      { group: '35-44', count: 3178, percentage: 20 },
      { group: '45-54', count: 1589, percentage: 10 },
      { group: '55+', count: 795, percentage: 5 }
    ]
  },
  transactions: {
    total: 254329,
    totalValue: 1254890,
    averageValue: 4.93,
    growth: 8.2,
    byType: [
      { type: 'Transfer', count: 101732, percentage: 40 },
      { type: 'Deposit', count: 63582, percentage: 25 },
      { type: 'Withdrawal', count: 50866, percentage: 20 },
      { type: 'Payment', count: 25433, percentage: 10 },
      { type: 'Airtime', count: 12716, percentage: 5 }
    ]
  },
  revenue: {
    total: 125489,
    growth: 15.3,
    bySource: [
      { source: 'Transaction Fees', amount: 75293, percentage: 60 },
      { source: 'Subscription Fees', amount: 25098, percentage: 20 },
      { source: 'Currency Exchange', amount: 18823, percentage: 15 },
      { source: 'Other Services', amount: 6275, percentage: 5 }
    ]
  },
  wallets: {
    total: 21543,
    active: 18312,
    averageBalance: 580.42,
    byCurrency: [
      { currency: 'USD', count: 15080, percentage: 70 },
      { currency: 'ZWL', count: 5386, percentage: 25 },
      { currency: 'Other', count: 1077, percentage: 5 }
    ]
  }
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month');

  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="main-content">
        <Header />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>System Analytics</h2>
          
          <div style={{ 
            display: 'flex', 
            borderRadius: '8px', 
            overflow: 'hidden', 
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
          }}>
            <button 
              onClick={() => setTimeRange('week')} 
              style={{
                padding: '8px 16px',
                border: 'none',
                backgroundColor: timeRange === 'week' ? '#2D64D8' : 'white',
                color: timeRange === 'week' ? 'white' : '#555',
                cursor: 'pointer',
                fontWeight: timeRange === 'week' ? 'bold' : 'normal',
              }}
            >
              Week
            </button>
            <button 
              onClick={() => setTimeRange('month')} 
              style={{
                padding: '8px 16px',
                border: 'none',
                backgroundColor: timeRange === 'month' ? '#2D64D8' : 'white',
                color: timeRange === 'month' ? 'white' : '#555',
                cursor: 'pointer',
                fontWeight: timeRange === 'month' ? 'bold' : 'normal',
              }}
            >
              Month
            </button>
            <button 
              onClick={() => setTimeRange('year')} 
              style={{
                padding: '8px 16px',
                border: 'none',
                backgroundColor: timeRange === 'year' ? '#2D64D8' : 'white',
                color: timeRange === 'year' ? 'white' : '#555',
                cursor: 'pointer',
                fontWeight: timeRange === 'year' ? 'bold' : 'normal',
              }}
            >
              Year
            </button>
            <button 
              onClick={() => setTimeRange('all')} 
              style={{
                padding: '8px 16px',
                border: 'none',
                backgroundColor: timeRange === 'all' ? '#2D64D8' : 'white',
                color: timeRange === 'all' ? 'white' : '#555',
                cursor: 'pointer',
                fontWeight: timeRange === 'all' ? 'bold' : 'normal',
              }}
            >
              All time
            </button>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="responsive-stats">
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            borderLeft: '4px solid #2D64D8'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <FiUsers size={18} color="#2D64D8" style={{ marginRight: '8px' }} />
              <div style={{ color: '#777', fontSize: '14px' }}>Total Users</div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{formatNumber(analyticsData.users.total)}</div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: analyticsData.users.growth > 0 ? '#4CAF50' : '#F44336',
              fontSize: '13px',
              marginTop: '8px' 
            }}>
              {analyticsData.users.growth > 0 ? 
                <FiTrendingUp size={14} style={{ marginRight: '4px' }} /> :
                <FiTrendingDown size={14} style={{ marginRight: '4px' }} />
              }
              {analyticsData.users.growth}% from last {timeRange}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            borderLeft: '4px solid #F44336'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <FiDollarSign size={18} color="#F44336" style={{ marginRight: '8px' }} />
              <div style={{ color: '#777', fontSize: '14px' }}>Total Revenue</div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{formatCurrency(analyticsData.revenue.total)}</div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: analyticsData.revenue.growth > 0 ? '#4CAF50' : '#F44336',
              fontSize: '13px',
              marginTop: '8px' 
            }}>
              {analyticsData.revenue.growth > 0 ? 
                <FiTrendingUp size={14} style={{ marginRight: '4px' }} /> :
                <FiTrendingDown size={14} style={{ marginRight: '4px' }} />
              }
              {analyticsData.revenue.growth}% from last {timeRange}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            borderLeft: '4px solid #4CAF50'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <FiActivity size={18} color="#4CAF50" style={{ marginRight: '8px' }} />
              <div style={{ color: '#777', fontSize: '14px' }}>Transaction Volume</div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{formatNumber(analyticsData.transactions.total)}</div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: analyticsData.transactions.growth > 0 ? '#4CAF50' : '#F44336',
              fontSize: '13px',
              marginTop: '8px' 
            }}>
              {analyticsData.transactions.growth > 0 ? 
                <FiTrendingUp size={14} style={{ marginRight: '4px' }} /> :
                <FiTrendingDown size={14} style={{ marginRight: '4px' }} />
              }
              {analyticsData.transactions.growth}% from last {timeRange}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            borderLeft: '4px solid #FFC107'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <FiCreditCard size={18} color="#FFC107" style={{ marginRight: '8px' }} />
              <div style={{ color: '#777', fontSize: '14px' }}>Active Wallets</div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{formatNumber(analyticsData.wallets.active)}</div>
            <div style={{ 
              fontSize: '13px',
              color: '#777',
              marginTop: '8px' 
            }}>
              {Math.round((analyticsData.wallets.active / analyticsData.wallets.total) * 100)}% of total wallets
            </div>
          </div>
        </div>
        
        {/* Detailed Analytics */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginTop: '24px' }}>
          {/* User Demographics */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            flex: '1 1 45%',
            minWidth: '300px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <FiUsers size={18} color="#2D64D8" style={{ marginRight: '8px' }} />
              User Demographics
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>By Country</h4>
              {analyticsData.users.byCountry.map((item, index) => (
                <div key={`country-${index}`} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
                    <span>{item.country}</span>
                    <span>{item.percentage}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${item.percentage}%`, 
                      height: '100%', 
                      backgroundColor: index === 0 ? '#2D64D8' : index === 1 ? '#4CAF50' : index === 2 ? '#FFC107' : '#F44336',
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              ))}
            </div>
            
            <div>
              <h4 style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>By Age Group</h4>
              {analyticsData.users.byAge.map((item, index) => (
                <div key={`age-${index}`} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
                    <span>{item.group}</span>
                    <span>{item.percentage}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${item.percentage}%`, 
                      height: '100%', 
                      backgroundColor: index === 0 ? '#9C27B0' : index === 1 ? '#3F51B5' : index === 2 ? '#00BCD4' : index === 3 ? '#009688' : '#795548',
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Transaction Analysis */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            flex: '1 1 45%',
            minWidth: '300px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <FiActivity size={18} color="#4CAF50" style={{ marginRight: '8px' }} />
              Transaction Analysis
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '14px', color: '#777' }}>Average Transaction Value</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>${analyticsData.transactions.averageValue}</div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#777' }}>Total Transaction Value</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{formatCurrency(analyticsData.transactions.totalValue)}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>By Transaction Type</h4>
              {analyticsData.transactions.byType.map((item, index) => (
                <div key={`txn-${index}`} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
                    <span>{item.type}</span>
                    <span>{formatNumber(item.count)} ({item.percentage}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${item.percentage}%`, 
                      height: '100%', 
                      backgroundColor: index === 0 ? '#4CAF50' : index === 1 ? '#2D64D8' : index === 2 ? '#F44336' : index === 3 ? '#FFC107' : '#FF9800',
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Revenue Breakdown */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            flex: '1 1 45%',
            minWidth: '300px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <FiDollarSign size={18} color="#F44336" style={{ marginRight: '8px' }} />
              Revenue Breakdown
            </h3>
            
            <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: '#555' }}>Source</span>
              <span style={{ fontSize: '14px', color: '#555' }}>Amount</span>
            </div>
            
            {analyticsData.revenue.bySource.map((item, index) => (
              <div key={`revenue-${index}`} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      backgroundColor: index === 0 ? '#F44336' : index === 1 ? '#2D64D8' : index === 2 ? '#4CAF50' : '#FFC107',
                      marginRight: '8px'
                    }} />
                    <span style={{ fontSize: '14px' }}>{item.source}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500' }}>{formatCurrency(item.amount)}</span>
                    <span style={{ 
                      fontSize: '12px', 
                      color: '#777', 
                      marginLeft: '6px',
                      backgroundColor: '#f0f0f0',
                      padding: '2px 6px',
                      borderRadius: '10px'
                    }}>
                      {item.percentage}%
                    </span>
                  </div>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#f0f0f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${item.percentage}%`, 
                    height: '100%', 
                    backgroundColor: index === 0 ? '#F44336' : index === 1 ? '#2D64D8' : index === 2 ? '#4CAF50' : '#FFC107',
                    borderRadius: '3px'
                  }} />
                </div>
              </div>
            ))}
          </div>
          
          {/* Wallet Statistics */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            flex: '1 1 45%',
            minWidth: '300px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <FiCreditCard size={18} color="#FFC107" style={{ marginRight: '8px' }} />
              Wallet Statistics
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ flex: '1 1 auto', minWidth: '120px' }}>
                  <div style={{ fontSize: '14px', color: '#777', marginBottom: '5px' }}>Total Wallets</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{formatNumber(analyticsData.wallets.total)}</div>
                </div>
                <div style={{ flex: '1 1 auto', minWidth: '120px' }}>
                  <div style={{ fontSize: '14px', color: '#777', marginBottom: '5px' }}>Active Wallets</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{formatNumber(analyticsData.wallets.active)}</div>
                </div>
                <div style={{ flex: '1 1 auto', minWidth: '120px' }}>
                  <div style={{ fontSize: '14px', color: '#777', marginBottom: '5px' }}>Average Balance</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>${analyticsData.wallets.averageBalance}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>By Currency</h4>
              {analyticsData.wallets.byCurrency.map((item, index) => (
                <div key={`currency-${index}`} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
                    <span>{item.currency}</span>
                    <span>{formatNumber(item.count)} ({item.percentage}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${item.percentage}%`, 
                      height: '100%', 
                      backgroundColor: index === 0 ? '#FFC107' : index === 1 ? '#2D64D8' : '#F44336',
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Information Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: '15px 20px',
          borderRadius: '8px',
          marginTop: '24px',
          marginBottom: '20px'
        }}>
          <FiInfo size={18} color="#2D64D8" style={{ marginRight: '10px', flexShrink: 0 }} />
          <span style={{ fontSize: '14px', color: '#555' }}>
            Data shown is for the selected time period: <strong>{timeRange}</strong>. 
            Analytics are updated every 24 hours. Last updated: {new Date().toLocaleDateString()}.
          </span>
        </div>
      </div>
    </div>
  );
} 