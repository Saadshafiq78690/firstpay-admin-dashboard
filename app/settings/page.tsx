'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FiUser, FiLock, FiBell, FiGlobe, FiCreditCard, FiCheck, FiSave, FiPhoneCall } from 'react-icons/fi';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Handle client-side only functionality
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Don't render until component is mounted
  if (!mounted) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="main-content">
        <Header />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Settings</h2>
        </div>
        
        <div style={{ display: 'flex', gap: '24px', flexDirection: isMobile ? 'column' : 'row' }}>
          {/* Tabs */}
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            width: isMobile ? '100%' : '250px',
            height: 'fit-content'
          }}>
            <div 
              onClick={() => setActiveTab('profile')}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '15px', 
                borderRadius: '8px', 
                backgroundColor: activeTab === 'profile' ? '#f0f7ff' : 'transparent',
                color: activeTab === 'profile' ? '#2D64D8' : '#555',
                fontWeight: activeTab === 'profile' ? 'bold' : 'normal',
                marginBottom: '10px',
                cursor: 'pointer'
              }}
            >
              <FiUser size={18} style={{ marginRight: '10px' }} />
              Profile Settings
            </div>
            
            <div 
              onClick={() => setActiveTab('security')}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '15px', 
                borderRadius: '8px', 
                backgroundColor: activeTab === 'security' ? '#f0f7ff' : 'transparent',
                color: activeTab === 'security' ? '#2D64D8' : '#555',
                fontWeight: activeTab === 'security' ? 'bold' : 'normal',
                marginBottom: '10px',
                cursor: 'pointer'
              }}
            >
              <FiLock size={18} style={{ marginRight: '10px' }} />
              Security
            </div>
            
            <div 
              onClick={() => setActiveTab('notifications')}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '15px', 
                borderRadius: '8px', 
                backgroundColor: activeTab === 'notifications' ? '#f0f7ff' : 'transparent',
                color: activeTab === 'notifications' ? '#2D64D8' : '#555',
                fontWeight: activeTab === 'notifications' ? 'bold' : 'normal',
                marginBottom: '10px',
                cursor: 'pointer'
              }}
            >
              <FiBell size={18} style={{ marginRight: '10px' }} />
              Notifications
            </div>
            
            <div 
              onClick={() => setActiveTab('system')}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '15px', 
                borderRadius: '8px', 
                backgroundColor: activeTab === 'system' ? '#f0f7ff' : 'transparent',
                color: activeTab === 'system' ? '#2D64D8' : '#555',
                fontWeight: activeTab === 'system' ? 'bold' : 'normal',
                cursor: 'pointer'
              }}
            >
              <FiGlobe size={18} style={{ marginRight: '10px' }} />
              System Settings
            </div>
          </div>
          
          {/* Content */}
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            flex: 1
          }}>
            {activeTab === 'profile' && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Profile Settings</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500' }}>Name</label>
                    <input 
                      type="text" 
                      defaultValue="Admin User" 
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        width: '100%',
                        maxWidth: '400px'
                      }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500' }}>Email</label>
                    <input 
                      type="email" 
                      defaultValue="admin@firstpay.com" 
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        width: '100%',
                        maxWidth: '400px'
                      }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500' }}>Phone</label>
                    <input 
                      type="tel" 
                      defaultValue="+1234567890" 
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        width: '100%',
                        maxWidth: '400px'
                      }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500' }}>Role</label>
                    <select
                      defaultValue="super_admin"
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        width: '100%',
                        maxWidth: '400px'
                      }}
                    >
                      <option value="super_admin">Super Admin</option>
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>
                  
                  <button style={{
                    backgroundColor: '#2D64D8',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: 'fit-content'
                  }}>
                    <FiSave size={16} />
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Security Settings</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500' }}>Current Password</label>
                    <input 
                      type="password" 
                      placeholder="Enter current password" 
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        width: '100%',
                        maxWidth: '400px'
                      }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500' }}>New Password</label>
                    <input 
                      type="password" 
                      placeholder="Enter new password" 
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        width: '100%',
                        maxWidth: '400px'
                      }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500' }}>Confirm New Password</label>
                    <input 
                      type="password" 
                      placeholder="Confirm new password" 
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        width: '100%',
                        maxWidth: '400px'
                      }}
                    />
                  </div>
                  
                  <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#f9f9f9', 
                    borderRadius: '8px',
                    marginTop: '10px',
                    marginBottom: '10px',
                    maxWidth: '400px'
                  }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>Two-Factor Authentication</h4>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: '500' }}>Status: Enabled</div>
                        <div style={{ fontSize: '14px', color: '#777' }}>Last verified: May 5, 2023</div>
                      </div>
                      <button style={{
                        backgroundColor: '#F44336',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}>
                        Disable
                      </button>
                    </div>
                  </div>
                  
                  <button style={{
                    backgroundColor: '#2D64D8',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: 'fit-content'
                  }}>
                    <FiSave size={16} />
                    Update Password
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Notification Settings</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#f9f9f9', 
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '500' }}>Email Notifications</h4>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '500' }}>New User Registrations</div>
                        <div style={{ fontSize: '14px', color: '#777' }}>Receive emails when new users register</div>
                      </div>
                      <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#2D64D8', borderRadius: '34px', transition: '.4s' }}></span>
                      </label>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '500' }}>Failed Transactions</div>
                        <div style={{ fontSize: '14px', color: '#777' }}>Get notified about failed transactions</div>
                      </div>
                      <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#2D64D8', borderRadius: '34px', transition: '.4s' }}></span>
                      </label>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '500' }}>KYC Applications</div>
                        <div style={{ fontSize: '14px', color: '#777' }}>Get notified for new KYC applications</div>
                      </div>
                      <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#2D64D8', borderRadius: '34px', transition: '.4s' }}></span>
                      </label>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '500' }}>Security Alerts</div>
                        <div style={{ fontSize: '14px', color: '#777' }}>Receive security related notifications</div>
                      </div>
                      <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#2D64D8', borderRadius: '34px', transition: '.4s' }}></span>
                      </label>
                    </div>
                  </div>
                  
                  <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#f9f9f9', 
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    marginTop: '10px'
                  }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '500' }}>In-App Notifications</h4>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '500' }}>All Notifications</div>
                        <div style={{ fontSize: '14px', color: '#777' }}>Enable or disable all in-app notifications</div>
                      </div>
                      <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
                        <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#2D64D8', borderRadius: '34px', transition: '.4s' }}></span>
                      </label>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '500' }}>Sound Alerts</div>
                        <div style={{ fontSize: '14px', color: '#777' }}>Play sound for new notifications</div>
                      </div>
                      <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '24px' }}>
                        <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#ccc', borderRadius: '34px', transition: '.4s' }}></span>
                      </label>
                    </div>
                  </div>
                  
                  <button style={{
                    backgroundColor: '#2D64D8',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: 'fit-content',
                    marginTop: '10px'
                  }}>
                    <FiSave size={16} />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'system' && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>System Settings</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500' }}>Default Currency</label>
                    <select
                      defaultValue="usd"
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        width: '100%',
                        maxWidth: '400px'
                      }}
                    >
                      <option value="usd">USD ($)</option>
                      <option value="zwl">ZWL (Z$)</option>
                      <option value="eur">EUR (€)</option>
                      <option value="gbp">GBP (£)</option>
                    </select>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500' }}>Time Zone</label>
                    <select
                      defaultValue="utc"
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        width: '100%',
                        maxWidth: '400px'
                      }}
                    >
                      <option value="utc">UTC (Coordinated Universal Time)</option>
                      <option value="et">ET (Eastern Time)</option>
                      <option value="cat">CAT (Central Africa Time)</option>
                      <option value="west">WEST (Western European Summer Time)</option>
                    </select>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500' }}>Date Format</label>
                    <select
                      defaultValue="mdy"
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        width: '100%',
                        maxWidth: '400px'
                      }}
                    >
                      <option value="mdy">MM/DD/YYYY</option>
                      <option value="dmy">DD/MM/YYYY</option>
                      <option value="ymd">YYYY/MM/DD</option>
                    </select>
                  </div>
                  
                  <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#f9f9f9', 
                    borderRadius: '8px',
                    marginTop: '10px',
                    maxWidth: '400px'
                  }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>System Maintenance</h4>
                    <div style={{ fontSize: '14px', color: '#777', marginBottom: '16px' }}>
                      Last maintenance: May 1, 2023 at 02:00 AM UTC
                    </div>
                    <button style={{
                      backgroundColor: '#2D64D8',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      Schedule Maintenance
                    </button>
                  </div>
                  
                  <button style={{
                    backgroundColor: '#2D64D8',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: 'fit-content',
                    marginTop: '10px'
                  }}>
                    <FiSave size={16} />
                    Save System Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 