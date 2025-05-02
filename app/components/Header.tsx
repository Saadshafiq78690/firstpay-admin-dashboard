'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiBell, FiMail, FiChevronDown } from 'react-icons/fi';

const Header = () => {
  const [notificationsCount, setNotificationsCount] = useState(5);
  const [messagesCount, setMessagesCount] = useState(3);
  const [searchActive, setSearchActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Check for mobile screen size
  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        if (searchActive && window.innerWidth >= 768) {
          setSearchActive(false);
        }
      };
      
      handleResize(); // Set initial value
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [searchActive]);
  
  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };
  
  // Don't render until component is mounted
  if (!mounted) {
    return null;
  }
  
  return (
    <header style={{ 
      backgroundColor: 'white', 
      padding: isMobile ? '12px 15px' : '16px 24px', 
      borderRadius: '16px', 
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      position: 'relative',
      zIndex: searchActive ? 1002 : 'auto'
    }}>
      {/* Left side */}
      <div style={{ 
        position: 'relative',
        flex: isMobile ? 'unset' : 1,
        marginRight: isMobile ? 0 : '20px',
        display: isMobile && !searchActive ? 'none' : 'block',
        width: isMobile && searchActive ? '100%' : 'auto',
      }}>
        {isMobile && searchActive ? (
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <div style={{ 
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              padding: '0 15px',
              display: 'flex',
              alignItems: 'center',
              height: '42px',
              flex: 1
            }}>
              <FiSearch size={20} color="#777" />
              <input 
                type="text" 
                placeholder="Search..." 
                style={{ 
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  marginLeft: '10px',
                  width: '100%',
                  fontSize: '15px'
                }}
                autoFocus
              />
            </div>
            <button 
              onClick={toggleSearch}
              style={{
                background: 'none',
                border: 'none',
                marginLeft: '10px',
                padding: '8px',
                cursor: 'pointer',
                color: '#555'
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div style={{ 
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            padding: '0 15px',
            display: 'flex',
            alignItems: 'center',
            height: '42px',
            maxWidth: '500px'
          }}>
            <FiSearch size={20} color="#777" />
            <input 
              type="text" 
              placeholder="Search..." 
              style={{ 
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                marginLeft: '10px',
                width: '100%',
                fontSize: '15px'
              }}
            />
          </div>
        )}
      </div>
      
      {/* Right side */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        marginLeft: isMobile && !searchActive ? 'auto' : 0
      }}>
        {isMobile && !searchActive && (
          <button 
            onClick={toggleSearch}
            style={{
              backgroundColor: '#f5f5f5',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              marginRight: '12px'
            }}
          >
            <FiSearch size={20} color="#777" />
          </button>
        )}
        
        {(!isMobile || !searchActive) && (
          <>
            <div style={{ 
              position: 'relative', 
              marginRight: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <button style={{ 
                backgroundColor: '#f5f5f5',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer'
              }}>
                <FiBell size={20} color="#555" />
              </button>
              {notificationsCount > 0 && (
                <div style={{ 
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  backgroundColor: '#F44336',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {notificationsCount}
                </div>
              )}
            </div>
            
            <div style={{ 
              position: 'relative', 
              marginRight: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <button style={{ 
                backgroundColor: '#f5f5f5',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer'
              }}>
                <FiMail size={20} color="#555" />
              </button>
              {messagesCount > 0 && (
                <div style={{ 
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  backgroundColor: '#2D64D8',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {messagesCount}
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div 
                style={{ 
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#2D64D8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  marginRight: '10px',
                }}
              >
                A
              </div>
              {!isMobile && (
                <>
                  <div style={{ marginRight: '6px' }}>
                    <div style={{ fontWeight: '500' }}>Admin User</div>
                    <div style={{ fontSize: '12px', color: '#777' }}>Super Admin</div>
                  </div>
                  <FiChevronDown size={20} color="#777" />
                </>
              )}
            </div>
          </>
        )}
      </div>
      
      {/* Mobile search overlay */}
      {isMobile && searchActive && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          zIndex: 1001
        }} onClick={toggleSearch} />
      )}
    </header>
  );
};

export default Header; 