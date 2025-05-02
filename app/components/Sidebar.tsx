'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiUsers, 
  FiDollarSign, 
  FiCreditCard, 
  FiSettings, 
  FiBarChart2, 
  FiMessageSquare, 
  FiLogOut,
  FiMenu,
  FiX,
  FiFileText
} from 'react-icons/fi';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if current path matches the menu item
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') {
      return true;
    }
    if (path !== '/' && pathname?.startsWith(path)) {
      return true;
    }
    return false;
  };

  // Create toggleMobileMenu as a callback to use in dependency array
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prevState => !prevState);
  }, []);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
        if (mobileMenuOpen) {
          document.body.style.overflow = 'hidden';
          document.body.classList.add('menu-open');
        } else {
          document.body.style.overflow = '';
          document.body.classList.remove('menu-open');
        }
      } else {
        setCollapsed(false);
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
      }
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Mobile menu button - visible only on small screens */}
      {isMobile && (
        <button 
          onClick={toggleMobileMenu} 
          className="mobile-menu-button"
          style={{ 
            position: 'fixed',
            top: '10px',
            left: '10px',
            zIndex: 1000,
            background: '#2D64D8',
            color: 'white',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      {/* Overlay for mobile view */}
      {isMobile && mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 998,
          }}
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${isMobile && !mobileMenuOpen ? 'hidden' : ''}`} style={{
        width: isMobile ? '280px' : (collapsed ? '80px' : '250px'),
        backgroundColor: '#2D64D8',
        height: '100vh',
        color: 'white',
        transition: isMobile ? 'transform 0.3s ease' : 'width 0.3s ease',
        position: 'fixed',
        top: 0,
        left: 0,
        overflowY: 'auto',
        zIndex: 999,
        transform: isMobile && !mobileMenuOpen ? 'translateX(-100%)' : 'translateX(0)',
        boxShadow: isMobile ? '0 0 15px rgba(0,0,0,0.2)' : 'none',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '20px', justifyContent: collapsed && !isMobile ? 'center' : 'space-between' }}>
          {(!collapsed || isMobile) && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#2D64D8', fontWeight: 'bold' }}>FP</span>
              </div>
              <span style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '18px' }}>FIRSTPAY</span>
            </div>
          )}
          {isMobile ? (
            <button 
              onClick={toggleMobileMenu}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'white', 
                cursor: 'pointer',
                padding: '5px'
              }}
            >
              <FiX size={24} />
            </button>
          ) : (
            <button 
              onClick={() => setCollapsed(!collapsed)} 
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'white', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5px'
              }}
            >
              {collapsed ? <FiMenu size={24} /> : <FiX size={24} />}
            </button>
          )}
        </div>

        <div style={{ 
          marginTop: '20px', 
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ flex: 1 }}>
            <NavItem 
              icon={<FiHome size={20} />} 
              label="Dashboard" 
              path="/" 
              collapsed={collapsed && !isMobile} 
              active={isActive('/')}
              onClick={toggleMobileMenu}
            />
            <NavItem 
              icon={<FiUsers size={20} />} 
              label="Users" 
              path="/users" 
              collapsed={collapsed && !isMobile} 
              active={isActive('/users')}
              onClick={toggleMobileMenu}
            />
            <NavItem 
              icon={<FiFileText size={20} />} 
              label="KYC Management" 
              path="/kyc" 
              collapsed={collapsed && !isMobile} 
              active={isActive('/kyc')}
              onClick={toggleMobileMenu}
            />
            <NavItem 
              icon={<FiDollarSign size={20} />} 
              label="Transactions" 
              path="/transactions" 
              collapsed={collapsed && !isMobile} 
              active={isActive('/transactions')}
              onClick={toggleMobileMenu}
            />
            <NavItem 
              icon={<FiCreditCard size={20} />} 
              label="Wallets" 
              path="/wallets" 
              collapsed={collapsed && !isMobile} 
              active={isActive('/wallets')}
              onClick={toggleMobileMenu}
            />
            <NavItem 
              icon={<FiBarChart2 size={20} />} 
              label="Analytics" 
              path="/analytics" 
              collapsed={collapsed && !isMobile} 
              active={isActive('/analytics')}
              onClick={toggleMobileMenu}
            />
            <NavItem 
              icon={<FiMessageSquare size={20} />} 
              label="Messages" 
              path="/messages" 
              collapsed={collapsed && !isMobile} 
              active={isActive('/messages')}
              onClick={toggleMobileMenu}
            />
            <NavItem 
              icon={<FiSettings size={20} />} 
              label="Settings" 
              path="/settings" 
              collapsed={collapsed && !isMobile} 
              active={isActive('/settings')}
              onClick={toggleMobileMenu}
            />
          </div>
          
          <div style={{ marginTop: 'auto', marginBottom: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '15px' }}>
            <NavItem 
              icon={<FiLogOut size={20} />} 
              label="Logout" 
              path="/logout" 
              collapsed={collapsed && !isMobile} 
              active={false}
              onClick={toggleMobileMenu}
            />
          </div>
        </div>
      </div>
      
      {/* Add spacing div to push content when sidebar is open on desktop */}
      {!isMobile && (
        <div style={{ 
          width: collapsed ? '80px' : '250px',
          flexShrink: 0,
          transition: 'width 0.3s ease'
        }} />
      )}
    </>
  );
};

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  path: string;
  collapsed: boolean;
  active: boolean;
  onClick?: () => void;
};

const NavItem = ({ icon, label, path, collapsed, active, onClick }: NavItemProps) => {
  return (
    <Link href={path} passHref legacyBehavior>
      <a 
        onClick={onClick && window.innerWidth < 768 ? onClick : undefined} 
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: collapsed ? '15px 0' : '15px 20px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            justifyContent: collapsed ? 'center' : 'flex-start',
            backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            borderLeft: active ? '4px solid white' : '4px solid transparent',
            marginBottom: '5px'
          }}
          className="nav-item"
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '24px', 
            height: '24px',
            color: active ? 'white' : 'rgba(255, 255, 255, 0.8)'
          }}>
            {icon}
          </div>
          {!collapsed && <span style={{ marginLeft: '15px', fontWeight: active ? 'bold' : 'normal' }}>{label}</span>}
        </div>
      </a>
    </Link>
  );
};

export default Sidebar; 