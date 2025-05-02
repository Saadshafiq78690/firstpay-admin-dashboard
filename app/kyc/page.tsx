'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FiSearch, FiFilter, FiEye, FiCheck, FiXCircle, FiAlertTriangle, FiCalendar, FiClock } from 'react-icons/fi';

// Mock data for KYC applications
const kycData = [
  {
    id: 'KYC10001',
    userId: 1,
    userName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1234567890',
    documentType: 'National ID',
    documentNumber: 'ID12345678',
    dateSubmitted: '2023-05-01T10:30:00',
    status: 'pending',
    comments: []
  },
  {
    id: 'KYC10002',
    userId: 2,
    userName: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '+1987654321',
    documentType: 'Passport',
    documentNumber: 'AB1234567',
    dateSubmitted: '2023-05-02T11:45:00',
    status: 'verified',
    comments: [
      { text: 'All documents verified successfully', date: '2023-05-03T09:15:00', by: 'Admin' }
    ]
  },
  {
    id: 'KYC10003',
    userId: 3,
    userName: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '+1456789123',
    documentType: 'Driver License',
    documentNumber: 'DL98765432',
    dateSubmitted: '2023-05-02T14:20:00',
    status: 'rejected',
    comments: [
      { text: 'Document illegible, please resubmit', date: '2023-05-03T10:30:00', by: 'Admin' }
    ]
  },
  {
    id: 'KYC10004',
    userId: 4,
    userName: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    phone: '+1789123456',
    documentType: 'National ID',
    documentNumber: 'ID87654321',
    dateSubmitted: '2023-05-03T16:05:00',
    status: 'pending',
    comments: []
  },
  {
    id: 'KYC10005',
    userId: 5,
    userName: 'James Davis',
    email: 'james.davis@example.com',
    phone: '+1321654987',
    documentType: 'Passport',
    documentNumber: 'CD7654321',
    dateSubmitted: '2023-05-04T17:30:00',
    status: 'pending',
    comments: []
  },
  {
    id: 'KYC10006',
    userId: 6,
    userName: 'Olivia Martinez',
    email: 'olivia.martinez@example.com',
    phone: '+1567891234',
    documentType: 'Driver License',
    documentNumber: 'DL54321678',
    dateSubmitted: '2023-05-05T09:45:00',
    status: 'pending',
    comments: []
  },
  {
    id: 'KYC10007',
    userId: 7,
    userName: 'William Taylor',
    email: 'william.taylor@example.com',
    phone: '+1654987321',
    documentType: 'National ID',
    documentNumber: 'ID13579086',
    dateSubmitted: '2023-05-05T11:20:00',
    status: 'verified',
    comments: [
      { text: 'Documents verified, address confirmation pending', date: '2023-05-06T13:40:00', by: 'Admin' },
      { text: 'Address verification complete', date: '2023-05-06T15:10:00', by: 'Admin' }
    ]
  }
];

export default function KYCPage() {
  const [applications, setApplications] = useState(kycData);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [documentTypeFilter, setDocumentTypeFilter] = useState('all');

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.userName.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesDocType = documentTypeFilter === 'all' || app.documentType === documentTypeFilter;
    
    return matchesSearch && matchesStatus && matchesDocType;
  });

  // Count KYC applications by status
  const kycCounts = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    verified: applications.filter(app => app.status === 'verified').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      case 'rejected':
        return '#F44336';
      default:
        return '#555';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <FiCheck size={16} color="#4CAF50" />;
      case 'pending':
        return <FiClock size={16} color="#FFC107" />;
      case 'rejected':
        return <FiXCircle size={16} color="#F44336" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
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
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>KYC Management</h2>
        </div>
        
        {/* KYC Statistics */}
        <div className="responsive-stats">
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            borderLeft: '4px solid #2D64D8'
          }}>
            <div style={{ color: '#777', fontSize: '14px', marginBottom: '10px' }}>Total Applications</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{kycCounts.total}</div>
            <div style={{ color: '#777', fontSize: '12px', marginTop: '5px' }}>
              +{Math.floor(Math.random() * 10) + 1} this week
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            borderLeft: '4px solid #FFC107'
          }}>
            <div style={{ color: '#777', fontSize: '14px', marginBottom: '10px' }}>Pending Verification</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{kycCounts.pending}</div>
            <div style={{ color: '#777', fontSize: '12px', marginTop: '5px' }}>
              {Math.round(kycCounts.pending / kycCounts.total * 100)}% of applications
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            borderLeft: '4px solid #4CAF50'
          }}>
            <div style={{ color: '#777', fontSize: '14px', marginBottom: '10px' }}>Verified</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{kycCounts.verified}</div>
            <div style={{ color: '#777', fontSize: '12px', marginTop: '5px' }}>
              {Math.round(kycCounts.verified / kycCounts.total * 100)}% of applications
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            borderLeft: '4px solid #F44336'
          }}>
            <div style={{ color: '#777', fontSize: '14px', marginBottom: '10px' }}>Rejected</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{kycCounts.rejected}</div>
            <div style={{ color: '#777', fontSize: '12px', marginTop: '5px' }}>
              {Math.round(kycCounts.rejected / kycCounts.total * 100)}% of applications
            </div>
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
                placeholder="Search applications..."
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
                  value={documentTypeFilter}
                  onChange={(e) => setDocumentTypeFilter(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    outline: 'none'
                  }}
                >
                  <option value="all">All Documents</option>
                  <option value="National ID">National ID</option>
                  <option value="Passport">Passport</option>
                  <option value="Driver License">Driver License</option>
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
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Application ID</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>User Name</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Contact</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Document Type</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Submitted</th>
                  <th style={{ padding: '16px', textAlign: 'center', color: '#555', fontWeight: 600, borderBottom: '1px solid #eee' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '16px', color: '#2D64D8', fontWeight: 500 }}>{app.id}</td>
                    <td style={{ padding: '16px', fontWeight: 500 }}>{app.userName}</td>
                    <td style={{ padding: '16px' }}>
                      <div>
                        <div>{app.email}</div>
                        <div style={{ color: '#777', fontSize: '13px' }}>{app.phone}</div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div>
                        <div>{app.documentType}</div>
                        <div style={{ color: '#777', fontSize: '13px' }}>{app.documentNumber}</div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '16px',
                          backgroundColor: `${getStatusColor(app.status)}20`,
                          color: getStatusColor(app.status),
                          fontWeight: 500,
                          fontSize: '14px',
                          textTransform: 'capitalize',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          {getStatusIcon(app.status)}
                          {app.status}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#777' }}>
                        <FiCalendar size={14} />
                        {formatDate(app.dateSubmitted)}
                      </div>
                    </td>
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
                        
                        {app.status === 'pending' && (
                          <>
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
                              <FiCheck size={14} />
                              Approve
                            </button>
                            
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
                              <FiXCircle size={14} />
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span style={{ color: '#555' }}>Showing {filteredApplications.length} of {applications.length} applications</span>
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