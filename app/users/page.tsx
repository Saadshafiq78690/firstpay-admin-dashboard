'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FiSearch, FiEdit2, FiTrash2, FiEye, FiUserPlus, FiFilter } from 'react-icons/fi';

// Mock data for users
const usersData = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1234567890',
    walletBalance: 1250.75,
    currency: 'USD',
    status: 'active',
    verified: true,
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '+1987654321',
    walletBalance: 3400.00,
    currency: 'USD',
    status: 'active',
    verified: true,
    joinDate: '2023-02-20'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '+1456789123',
    walletBalance: 750.25,
    currency: 'USD',
    status: 'inactive',
    verified: true,
    joinDate: '2023-01-05'
  },
  {
    id: 4,
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    phone: '+1789123456',
    walletBalance: 0.00,
    currency: 'USD',
    status: 'suspended',
    verified: false,
    joinDate: '2023-03-10'
  },
  {
    id: 5,
    name: 'James Davis',
    email: 'james.davis@example.com',
    phone: '+1321654987',
    walletBalance: 825.50,
    currency: 'USD',
    status: 'active',
    verified: true,
    joinDate: '2023-02-01'
  }
];

export default function UsersPage() {
  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search);
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#4CAF50';
      case 'inactive':
        return '#FFC107';
      case 'suspended':
        return '#F44336';
      default:
        return '#555';
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="main-content">
        <Header />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>User Management</h2>
          
          <button style={{
            backgroundColor: '#2D64D8',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '8px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontWeight: 500,
          }}>
            <FiUserPlus size={18} />
            Add New User
          </button>
        </div>
        
        <div style={{
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              padding: '10px 16px',
              width: '350px'
            }}>
              <FiSearch size={18} color="#777" />
              <input 
                type="text" 
                placeholder="Search users..."
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
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FiFilter size={18} color="#555" style={{ marginRight: '8px' }} />
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
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>User ID</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Name</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Email</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Phone</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Wallet Balance</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Verified</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Join Date</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '16px', color: '#555' }}>#{user.id}</td>
                    <td style={{ padding: '16px', fontWeight: 500 }}>{user.name}</td>
                    <td style={{ padding: '16px' }}>{user.email}</td>
                    <td style={{ padding: '16px' }}>{user.phone}</td>
                    <td style={{ padding: '16px' }}>{user.currency} {user.walletBalance.toFixed(2)}</td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '16px',
                        backgroundColor: `${getStatusColor(user.status)}20`,
                        color: getStatusColor(user.status),
                        fontWeight: 500,
                        fontSize: '14px',
                        textTransform: 'capitalize'
                      }}>
                        {user.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      {user.verified ? (
                        <span style={{ color: '#4CAF50', fontWeight: 500 }}>Yes</span>
                      ) : (
                        <span style={{ color: '#F44336', fontWeight: 500 }}>No</span>
                      )}
                    </td>
                    <td style={{ padding: '16px' }}>{new Date(user.joinDate).toLocaleDateString()}</td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                        <button style={{
                          background: 'none',
                          border: 'none',
                          color: '#2D64D8',
                          cursor: 'pointer',
                        }}>
                          <FiEye size={18} />
                        </button>
                        <button style={{
                          background: 'none',
                          border: 'none',
                          color: '#4CAF50',
                          cursor: 'pointer',
                        }}>
                          <FiEdit2 size={18} />
                        </button>
                        <button style={{
                          background: 'none',
                          border: 'none',
                          color: '#F44336',
                          cursor: 'pointer',
                        }}>
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            <div>
              <span style={{ color: '#555' }}>Showing {filteredUsers.length} of {users.length} users</span>
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
                2
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