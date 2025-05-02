import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FirstPay Admin Dashboard',
  description: 'Admin dashboard for FirstPay mobile wallet application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Inline script for fixing static file:// protocol navigation and asset loading */}
        <script dangerouslySetInnerHTML={{
          __html: `
          // Static export helper script
          (function() {
            // Only run in file:// protocol
            if (window.location.protocol === 'file:') {
              console.log('Static export mode detected, applying fixes');

              // STEP 1: Find the root out directory path
              function findRootPath() {
                let path = window.location.pathname;
                // Handle Windows backslashes
                path = path.replace(/\\\\/g, '/');
                
                // Find out directory in path
                const outIndex = path.indexOf('/out/');
                if (outIndex !== -1) {
                  return window.location.protocol + '//' + 
                         window.location.host + 
                         path.substring(0, outIndex + 5); // include /out/
                }
                return null;
              }

              // STEP 2: Create or update base tag
              function setBaseTag(rootPath) {
                if (!rootPath) return;
                
                // Remove any existing base tag
                const existingBase = document.querySelector('base');
                if (existingBase) existingBase.remove();
                
                // Create new base tag and add to head
                const base = document.createElement('base');
                base.href = rootPath;
                document.head.insertBefore(base, document.head.firstChild);
              }

              // STEP 3: Fix CSS loading
              function loadMainCSS(rootPath) {
                if (!rootPath) return;
                
                // Load critical CSS files directly
                const links = [
                  '_next/static/css/app/layout.css',
                  '_next/static/css/app/page.css'
                ];
                
                links.forEach(link => {
                  // Check if this CSS is already loaded
                  const existingLinks = document.querySelectorAll('link[rel="stylesheet"]');
                  let alreadyLoaded = false;
                  
                  existingLinks.forEach(existing => {
                    if (existing.href.includes(link)) {
                      alreadyLoaded = true;
                    }
                  });
                  
                  if (!alreadyLoaded) {
                    const cssLink = document.createElement('link');
                    cssLink.rel = 'stylesheet';
                    cssLink.href = rootPath + link;
                    document.head.appendChild(cssLink);
                  }
                });
              }

              // STEP 4: Fix navigation
              function fixNavigation(rootPath) {
                if (!rootPath) return;
                
                // Fix all internal links
                document.addEventListener('click', function(e) {
                  // Find closest anchor tag
                  let target = e.target;
                  while (target && target.tagName !== 'A') {
                    target = target.parentElement;
                  }
                  
                  // Only process internal links
                  if (target && target.href && target.getAttribute('href').startsWith('/')) {
                    e.preventDefault();
                    
                    const href = target.getAttribute('href');
                    let targetPath;
                    
                    if (href === '/') {
                      targetPath = 'index.html';
                    } else {
                      // Remove leading slash and add index.html if needed
                      let path = href.substring(1);
                      if (!path.endsWith('.html') && !path.endsWith('/')) {
                        path += '/index.html';
                      } else if (path.endsWith('/')) {
                        path += 'index.html';
                      }
                      targetPath = path;
                    }
                    
                    window.location.href = rootPath + targetPath;
                  }
                }, true);
              }

              // Apply all fixes
              function applyFixes() {
                const rootPath = findRootPath();
                if (rootPath) {
                  console.log('Root path detected:', rootPath);
                  setBaseTag(rootPath);
                  loadMainCSS(rootPath);
                  fixNavigation(rootPath);
                } else {
                  console.warn('Could not detect root path for static export');
                }
              }

              // Run immediately if DOM is already loaded
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', applyFixes);
              } else {
                applyFixes();
              }
            }
          })();
          `
        }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
} 