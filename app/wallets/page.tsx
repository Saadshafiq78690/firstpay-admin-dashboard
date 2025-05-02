'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FiSearch, FiFilter, FiEye, FiLock, FiUnlock, FiDollarSign, FiRefreshCw } from 'react-icons/fi';

// Mock data for wallets
const walletsData = [
  {
    id: 'W10001',
    userId: 1,
    userName: 'John Smith',
    type: 'USD',
    balance: 1250.75,
    status: 'active',
    lastTransaction: '2023-05-01T10:30:00',
    createdAt: '2023-01-15T08:30:00'
  },
  {
    id: 'W10002',
    userId: 1,
    userName: 'John Smith',
    type: 'ZWL',
    balance: 4500.50,
    status: 'active',
    lastTransaction: '2023-05-01T11:45:00',
    createdAt: '2023-01-15T08:35:00'
  },
  {
    id: 'W10003',
    userId: 2,
    userName: 'Alice Johnson',
    type: 'USD',
    balance: 3400.00,
    status: 'active',
    lastTransaction: '2023-05-02T14:20:00',
    createdAt: '2023-02-20T10:15:00'
  },
  {
    id: 'W10004',
    userId: 2,
    userName: 'Alice Johnson',
    type: 'ZWL',
    balance: 12500.25,
    status: 'active',
    lastTransaction: '2023-05-03T16:05:00',
    createdAt: '2023-02-20T10:20:00'
  },
  {
    id: 'W10005',
    userId: 3,
    userName: 'Michael Brown',
    type: 'USD',
    balance: 750.25,
    status: 'frozen',
    lastTransaction: '2023-04-25T17:30:00',
    createdAt: '2023-01-05T09:45:00'
  },
  {
    id: 'W10006',
    userId: 4,
    userName: 'Emma Wilson',
    type: 'USD',
    balance: 0.00,
    status: 'inactive',
    lastTransaction: 'none',
    createdAt: '2023-03-10T14:30:00'
  },
  {
    id: 'W10007',
    userId: 5,
    userName: 'James Davis',
    type: 'USD',
    balance: 825.50,
    status: 'active',
    lastTransaction: '2023-05-04T13:40:00',
    createdAt: '2023-02-01T11:20:00'
  }
];

export default function WalletsPage() {
  const [wallets, setWallets] = useState(walletsData);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredWallets = wallets.filter(wallet => {
    const matchesSearch = 
      wallet.id.toLowerCase().includes(search.toLowerCase()) ||
      wallet.userName.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || wallet.status === statusFilter;
    const matchesType = typeFilter === 'all' || wallet.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Count wallets by currency and status
  const walletCounts = {
    total: wallets.length,
    usd: wallets.filter(wallet => wallet.type === 'USD').length,
    zwl: wallets.filter(wallet => wallet.type === 'ZWL').length,
    active: wallets.filter(wallet => wallet.status === 'active').length,
    frozen: wallets.filter(wallet => wallet.status === 'frozen').length,
    inactive: wallets.filter(wallet => wallet.status === 'inactive').length
  };

  // Calculate total balances
  const totalBalances = {
    usd: wallets.filter(wallet => wallet.type === 'USD')
      .reduce((sum, wallet) => sum + wallet.balance, 0).toFixed(2),
    zwl: wallets.filter(wallet => wallet.type === 'ZWL')
      .reduce((sum, wallet) => sum + wallet.balance, 0).toFixed(2)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#4CAF50';
      case 'frozen':
        return '#2D64D8';
      case 'inactive':
        return '#F44336';
      default:
        return '#555';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <FiUnlock size={16} color="#4CAF50" />;
      case 'frozen':
        return <FiLock size={16} color="#2D64D8" />;
      case 'inactive':
        return <FiLock size={16} color="#F44336" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    if (dateString === 'none') return 'No transactions';
    
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="main-content">
        <Header />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Wallet Management</h2>
        </div>
        
        {/* Wallet Statistics */}
        <div className="responsive-stats">
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            borderLeft: '4px solid #2D64D8'
          }}>
            <div style={{ color: '#777', fontSize: '14px', marginBottom: '10px' }}>Total USD Balance</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>$ {totalBalances.usd}</div>
            <div style={{ color: '#777', fontSize: '12px', marginTop: '5px' }}>{walletCounts.usd} active wallets</div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            borderLeft: '4px solid #4CAF50'
          }}>
            <div style={{ color: '#777', fontSize: '14px', marginBottom: '10px' }}>Total ZWL Balance</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>ZWL {totalBalances.zwl}</div>
            <div style={{ color: '#777', fontSize: '12px', marginTop: '5px' }}>{walletCounts.zwl} active wallets</div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            borderLeft: '4px solid #FFC107'
          }}>
            <div style={{ color: '#777', fontSize: '14px', marginBottom: '10px' }}>Active Wallets</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{walletCounts.active}</div>
            <div style={{ color: '#777', fontSize: '12px', marginTop: '5px' }}>{Math.round(walletCounts.active / walletCounts.total * 100)}% of total</div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            borderLeft: '4px solid #F44336'
          }}>
            <div style={{ color: '#777', fontSize: '14px', marginBottom: '10px' }}>Frozen/Inactive</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{walletCounts.frozen + walletCounts.inactive}</div>
            <div style={{ color: '#777', fontSize: '12px', marginTop: '5px' }}>{walletCounts.frozen} frozen, {walletCounts.inactive} inactive</div>
          </div>
        </div>
        
        <div style={{
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginTop: '24px'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              padding: '10px 16px',
              width: '300px',
              maxWidth: '100%'
            }}>
              <FiSearch size={18} color="#777" />
              <input 
                type="text" 
                placeholder="Search wallets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ 
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  marginLeft: '10px',
                  width: '100%'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FiFilter size={18} color="#555" style={{ marginRight: '8px' }} />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    outline: 'none'
                  }}
                >
                  <option value="all">All Currencies</option>
                  <option value="USD">USD</option>
                  <option value="ZWL">ZWL</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    outline: 'none'
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="frozen">Frozen</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Wallet ID</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>User</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Type</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Balance</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Last Transaction</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Created</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWallets.map((wallet) => (
                  <tr key={wallet.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '16px', color: '#2D64D8', fontWeight: 500 }}>{wallet.id}</td>
                    <td style={{ padding: '16px', fontWeight: 500 }}>{wallet.userName}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: wallet.type === 'USD' ? '#D6E6FF' : '#E8F5E9',
                        color: wallet.type === 'USD' ? '#2D64D8' : '#4CAF50',
                        fontWeight: 500,
                        fontSize: '14px'
                      }}>
                        {wallet.type}
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontWeight: 500 }}>
                      {wallet.type} {wallet.balance.toFixed(2)}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '16px',
                          backgroundColor: `${getStatusColor(wallet.status)}20`,
                          color: getStatusColor(wallet.status),
                          fontWeight: 500,
                          fontSize: '14px',
                          textTransform: 'capitalize',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          {getStatusIcon(wallet.status)}
                          {wallet.status}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>{formatDate(wallet.lastTransaction)}</td>
                    <td style={{ padding: '16px' }}>{new Date(wallet.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        <button style={{
                          padding: '6px 12px',
                          backgroundColor: '#2D64D8',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          <FiEye size={14} />
                          View
                        </button>
                        
                        {wallet.status === 'active' ? (
                          <button style={{
                            padding: '6px 12px',
                            backgroundColor: '#2D64D820',
                            color: '#2D64D8',
                            border: '1px solid #2D64D8',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            <FiLock size={14} />
                            Freeze
                          </button>
                        ) : (
                          <button style={{
                            padding: '6px 12px',
                            backgroundColor: '#4CAF5020',
                            color: '#4CAF50',
                            border: '1px solid #4CAF50',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            <FiUnlock size={14} />
                            Activate
                          </button>
                        )}
                        
                        <button style={{
                          padding: '6px 12px',
                          backgroundColor: '#F4433620',
                          color: '#F44336',
                          border: '1px solid #F44336',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          <FiRefreshCw size={14} />
                          Reset
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span style={{ color: '#555' }}>Showing {filteredWallets.length} of {wallets.length} wallets</span>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                backgroundColor: 'white',
                borderRadius: '6px',
                color: '#555',
                cursor: 'pointer',
              }}>
                Previous
              </button>
              
              <button style={{
                padding: '8px 12px',
                backgroundColor: '#2D64D8',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}>
                1
              </button>
              
              <button style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                backgroundColor: 'white',
                borderRadius: '6px',
                color: '#555',
                cursor: 'pointer',
              }}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 