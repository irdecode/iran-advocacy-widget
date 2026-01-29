/**
 * Iran Advocacy Widget - Embed Script
 * Version: 1.0.0
 * Repository: https://github.com/irdecode/iran-advocacy-widget
 * License: MIT
 */

(function() {
    'use strict';
    
    // Configuration
    const VERSION = '1.0.0';
    const WIDGET_CONFIG = {
        widgetUrl: 'https://irdecode.com/widget',
        containerId: 'iran-advocacy-widget',
        defaultWidth: '100%',
        defaultHeight: '800px',
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        allowedOrigins: ['https://irdecode.com'],
        debug: false,
    };
    
    // Logging utility
    function log(message, type = 'info') {
        if (!WIDGET_CONFIG.debug) return;
        const prefix = '[Iran Widget]';
        console[type](prefix, message);
    }
    
    // Error handler
    function handleError(message, error) {
        log(message, 'error');
        console.error('[Iran Widget Error]', error);
        
        // Show user-friendly error
        const container = document.getElementById(WIDGET_CONFIG.containerId);
        if (container) {
            container.innerHTML = `
                <div style="
                    padding: 24px;
                    background: #fee;
                    border: 2px solid #fcc;
                    border-radius: 8px;
                    color: #c33;
                    font-family: -apple-system, sans-serif;
                    text-align: center;
                ">
                    <strong>Widget Error</strong>
                    <p style="margin: 8px 0 0; font-size: 14px;">
                        Unable to load advocacy widget. Please refresh the page.
                    </p>
                </div>
            `;
        }
    }
    
    // Validate origin for security
    function isOriginAllowed(origin) {
        return WIDGET_CONFIG.allowedOrigins.some(allowed => {
            return origin === allowed || origin.startsWith(allowed);
        });
    }
    
    // Initialize widget
    function initWidget() {
        log('Initializing widget v' + VERSION);
        
        // Check for container
        const container = document.getElementById(WIDGET_CONFIG.containerId);
        if (!container) {
            handleError('Container element not found', new Error('Missing #' + WIDGET_CONFIG.containerId));
            return;
        }
        
        // Get configuration from data attributes
        const customUrl = container.dataset.widgetUrl || WIDGET_CONFIG.widgetUrl;
        const width = container.dataset.width || WIDGET_CONFIG.defaultWidth;
        const height = container.dataset.height || WIDGET_CONFIG.defaultHeight;
        const campaign = container.dataset.campaign || '';
        const recipient = container.dataset.recipient || '';
        
        // Build widget URL with parameters
        const params = new URLSearchParams();
        if (campaign) params.append('campaign', campaign);
        if (recipient) params.append('recipient', recipient);
        
        const widgetUrl = customUrl + (params.toString() ? '?' + params.toString() : '');
        
        log('Widget URL: ' + widgetUrl);
        
        // Create iframe
        const iframe = document.createElement('iframe');
        iframe.src = widgetUrl;
        iframe.style.cssText = `
            width: ${width};
            height: ${height};
            border: none;
            border-radius: ${WIDGET_CONFIG.borderRadius};
            box-shadow: ${WIDGET_CONFIG.boxShadow};
            display: block;
            max-width: 100%;
        `;
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('allow', 'clipb
