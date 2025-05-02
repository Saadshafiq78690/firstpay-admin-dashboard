'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FiSearch, FiFilter, FiStar, FiMessageCircle, FiPaperclip, FiTrash2, FiMail, FiUser } from 'react-icons/fi';

// Mock data for messages
const messagesData = [
  {
    id: 'M10001',
    from: 'John Smith',
    email: 'john.smith@example.com',
    subject: 'Question about account verification',
    content: 'Hello, I submitted my KYC documents yesterday but haven\'t heard back. Can you please check the status?',
    time: '2023-05-10T10:30:00',
    isRead: true,
    isStarred: false,
    hasAttachment: false
  },
  {
    id: 'M10002',
    from: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    subject: 'Failed transaction issue',
    content: 'I tried to make a payment but it failed three times. The money was deducted from my account but the recipient didn\'t receive it. Transaction ID: TX78945612.',
    time: '2023-05-09T16:45:00',
    isRead: false,
    isStarred: true,
    hasAttachment: true
  },
  {
    id: 'M10003',
    from: 'Michael Brown',
    email: 'michael.brown@example.com',
    subject: 'Account upgrade request',
    content: 'I would like to upgrade my account to the premium tier. What are the steps I need to follow?',
    time: '2023-05-09T11:20:00',
    isRead: true,
    isStarred: false,
    hasAttachment: false
  },
  {
    id: 'M10004',
    from: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    subject: 'Feedback on new features',
    content: 'I wanted to share some feedback on the new transfer feature. It\'s much faster and easier to use now. Great job!',
    time: '2023-05-08T14:10:00',
    isRead: true,
    isStarred: true,
    hasAttachment: false
  },
  {
    id: 'M10005',
    from: 'James Davis',
    email: 'james.davis@example.com',
    subject: 'Reporting a bug in the app',
    content: 'I found a bug in the mobile app. When I try to view my transaction history for April, the app crashes. I\'m using the latest version on Android.',
    time: '2023-05-08T09:35:00',
    isRead: false,
    isStarred: false,
    hasAttachment: true
  },
  {
    id: 'M10006',
    from: 'System Notification',
    email: 'system@firstpay.com',
    subject: 'Security alert: New device login',
    content: 'A new device was used to log into your admin account on May 7, 2023, at 08:15 AM. If this was not you, please contact security immediately.',
    time: '2023-05-07T08:15:00',
    isRead: false,
    isStarred: true,
    hasAttachment: false
  }
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(messagesData);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Check if code is running in browser
  useEffect(() => {
    setMounted(true);
    
    // Set initial mobile state
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      
      // Add window resize listener
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Don't render UI elements that depend on window until component is mounted
  if (!mounted) {
    return <div>Loading...</div>;
  }
  
  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.from.toLowerCase().includes(search.toLowerCase()) ||
      message.subject.toLowerCase().includes(search.toLowerCase()) ||
      message.content.toLowerCase().includes(search.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'unread') return matchesSearch && !message.isRead;
    if (filterStatus === 'starred') return matchesSearch && message.isStarred;
    if (filterStatus === 'attachments') return matchesSearch && message.hasAttachment;
    
    return matchesSearch;
  });

  const getSelectedMessage = () => {
    return messages.find(message => message.id === selectedMessage);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const markAsRead = (id: string) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, isRead: true } : message
    ));
    setSelectedMessage(id);
  };

  const toggleStar = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setMessages(messages.map(message => 
      message.id === id ? { ...message, isStarred: !message.isStarred } : message
    ));
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="main-content">
        <Header />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Messages</h2>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '20px',
          flexDirection: isMobile ? 'column' : 'row',
          height: 'calc(100vh - 200px)'
        }}>
          {/* Message List */}
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: selectedMessage && !isMobile ? '40%' : '100%',
            display: selectedMessage && isMobile ? 'none' : 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ padding: '20px' }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                padding: '10px 16px',
                marginBottom: '20px'
              }}>
                <FiSearch size={18} color="#777" />
                <input 
                  type="text" 
                  placeholder="Search messages..."
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
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                <button 
                  onClick={() => setFilterStatus('all')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: filterStatus === 'all' ? '#2D64D8' : 'transparent',
                    color: filterStatus === 'all' ? 'white' : '#555',
                    border: filterStatus === 'all' ? 'none' : '1px solid #ddd',
                    borderRadius: '20px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilterStatus('unread')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: filterStatus === 'unread' ? '#2D64D8' : 'transparent',
                    color: filterStatus === 'unread' ? 'white' : '#555',
                    border: filterStatus === 'unread' ? 'none' : '1px solid #ddd',
                    borderRadius: '20px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <FiMail size={14} style={{ marginRight: '6px' }} />
                  Unread
                </button>
                <button 
                  onClick={() => setFilterStatus('starred')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: filterStatus === 'starred' ? '#2D64D8' : 'transparent',
                    color: filterStatus === 'starred' ? 'white' : '#555',
                    border: filterStatus === 'starred' ? 'none' : '1px solid #ddd',
                    borderRadius: '20px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <FiStar size={14} style={{ marginRight: '6px' }} />
                  Starred
                </button>
                <button 
                  onClick={() => setFilterStatus('attachments')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: filterStatus === 'attachments' ? '#2D64D8' : 'transparent',
                    color: filterStatus === 'attachments' ? 'white' : '#555',
                    border: filterStatus === 'attachments' ? 'none' : '1px solid #ddd',
                    borderRadius: '20px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <FiPaperclip size={14} style={{ marginRight: '6px' }} />
                  Attachments
                </button>
              </div>
            </div>
            
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {filteredMessages.length === 0 ? (
                <div style={{ 
                  padding: '40px 20px', 
                  textAlign: 'center', 
                  color: '#777' 
                }}>
                  No messages found
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div 
                    key={message.id} 
                    onClick={() => markAsRead(message.id)}
                    style={{
                      padding: '15px 20px',
                      borderBottom: '1px solid #eee',
                      backgroundColor: message.isRead ? 'white' : '#f0f7ff',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      display: 'flex',
                      position: 'relative'
                    }}
                  >
                    <div 
                      style={{ 
                        marginRight: '15px', 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        backgroundColor: message.isRead ? '#f5f5f5' : '#D6E6FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {message.isRead ? 
                        <FiUser size={20} color="#777" /> : 
                        <FiMail size={20} color="#2D64D8" />
                      }
                    </div>
                    <div style={{ overflow: 'hidden', flex: 1 }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        marginBottom: '6px', 
                        overflow: 'hidden' 
                      }}>
                        <div style={{ 
                          fontWeight: message.isRead ? 'normal' : 'bold', 
                          whiteSpace: 'nowrap', 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis' 
                        }}>
                          {message.from}
                        </div>
                        <div style={{ 
                          fontSize: '12px', 
                          color: '#777', 
                          whiteSpace: 'nowrap',
                          marginLeft: '10px'
                        }}>
                          {formatDate(message.time)}
                        </div>
                      </div>
                      <div style={{ 
                        fontWeight: message.isRead ? 'normal' : 'bold',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginBottom: '6px'
                      }}>
                        {message.subject}
                      </div>
                      <div style={{ 
                        fontSize: '14px',
                        color: '#777',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {message.content}
                      </div>
                    </div>
                    
                    <div onClick={(e) => toggleStar(message.id, e)} style={{ 
                      position: 'absolute',
                      top: '15px',
                      right: '20px',
                      color: message.isStarred ? '#FFC107' : '#ddd',
                      cursor: 'pointer'
                    }}>
                      <FiStar size={18} fill={message.isStarred ? '#FFC107' : 'none'} />
                    </div>
                    
                    {message.hasAttachment && (
                      <div style={{ 
                        position: 'absolute',
                        bottom: '15px',
                        right: '20px'
                      }}>
                        <FiPaperclip size={16} color="#777" />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Message Detail */}
          {selectedMessage && (
            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              width: !isMobile ? '60%' : '100%',
              padding: '24px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {getSelectedMessage() && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
                        {getSelectedMessage()?.subject}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ 
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: '#f5f5f5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '10px'
                        }}>
                          <FiUser size={18} color="#555" />
                        </div>
                        <div>
                          <div style={{ fontWeight: '500' }}>{getSelectedMessage()?.from}</div>
                          <div style={{ fontSize: '13px', color: '#777' }}>{getSelectedMessage()?.email}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ 
                      fontSize: '13px', 
                      color: '#777',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      {new Date(getSelectedMessage()?.time || '').toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  
                  <div style={{ flex: 1, marginBottom: '20px', lineHeight: '1.6' }}>
                    <p style={{ whiteSpace: 'pre-line' }}>{getSelectedMessage()?.content}</p>
                  </div>
                  
                  {getSelectedMessage()?.hasAttachment && (
                    <div style={{ 
                      marginBottom: '20px',
                      padding: '15px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '8px'
                    }}>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        fontWeight: '500'
                      }}>
                        <FiPaperclip size={16} style={{ marginRight: '8px' }} />
                        Attachments
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        border: '1px solid #eee',
                        borderRadius: '6px',
                        backgroundColor: 'white'
                      }}>
                        <div style={{ 
                          width: '40px',
                          height: '40px',
                          backgroundColor: '#D6E6FF',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '10px'
                        }}>
                          <FiPaperclip size={20} color="#2D64D8" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div>Document-{getSelectedMessage()?.id}.pdf</div>
                          <div style={{ fontSize: '12px', color: '#777' }}>12.5 MB</div>
                        </div>
                        <button style={{
                          backgroundColor: '#2D64D8',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px 12px',
                          fontSize: '14px',
                          cursor: 'pointer'
                        }}>
                          Download
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{
                      backgroundColor: '#2D64D8',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '10px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}>
                      <FiMessageCircle size={16} />
                      Reply
                    </button>
                    
                    <button style={{
                      backgroundColor: 'transparent',
                      color: '#F44336',
                      border: '1px solid #F44336',
                      borderRadius: '6px',
                      padding: '10px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}>
                      <FiTrash2 size={16} />
                      Delete
                    </button>
                    
                    {isMobile && (
                      <button 
                        onClick={() => setSelectedMessage(null)}
                        style={{
                          backgroundColor: 'transparent',
                          color: '#555',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          padding: '10px 20px',
                          marginLeft: 'auto',
                          cursor: 'pointer'
                        }}
                      >
                        Back
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 