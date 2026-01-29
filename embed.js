/**
 * IRdecode Advocacy Widget Embed Script
 * Version: 2.0.1 - Fixed syntax errors
 */

(function() {
    'use strict';
    
    const CONFIG = {
        WIDGET_URL: 'https://irdecode.com/widget',
        DEFAULT_HEIGHT: 950,
        DEBUG: true // Enable debug for troubleshooting
    };
    
    const log = function() {
        if (CONFIG.DEBUG) {
            console.log.apply(console, ['[IRdecode Widget]'].concat(Array.prototype.slice.call(arguments)));
        }
    };
    
    const error = function() {
        console.error.apply(console, ['[IRdecode Widget]'].concat(Array.prototype.slice.call(arguments)));
    };
    
    function initWidget() {
        log('Initializing widgets...');
        
        const containers = document.querySelectorAll('[data-irdecode-widget]');
        
        if (containers.length === 0) {
            log('No widget containers found');
            return;
        }
        
        log('Found ' + containers.length + ' widget container(s)');
        
        containers.forEach(function(container, index) {
            try {
                createWidget(container, index);
            } catch (err) {
                error('Failed to create widget:', err);
            }
        });
    }
    
    function createWidget(container, index) {
        const apiKey = container.getAttribute('data-api-key');
        
        if (!apiKey) {
            error('Missing data-api-key attribute');
            container.innerHTML = '<div style="padding:40px;text-align:center;border:2px dashed #e5e5e5;border-radius:12px;background:#fafafa;"><div style="font-size:48px;margin-bottom:16px;">🔒</div><h3 style="margin:0 0 8px;color:#171717;">API Key Required</h3><p style="margin:0;color:#737373;font-size:14px;">Add <code>data-api-key="your_key"</code> to the widget container.</p></div>';
            return;
        }
        
        const campaign = container.getAttribute('data-campaign') || 'iran-irgc-terrorist-2026';
        const height = container.getAttribute('data-height') || CONFIG.DEFAULT_HEIGHT;
        
        const widgetUrl = new URL(CONFIG.WIDGET_URL);
        widgetUrl.searchParams.set('apiKey', apiKey);
        widgetUrl.searchParams.set('campaign', campaign);
        widgetUrl.searchParams.set('embedded', 'true');
        widgetUrl.searchParams.set('parent', window.location.hostname);
        
        log('Creating widget:', {
            apiKey: apiKey.substring(0, 10) + '...',
            campaign: campaign,
            height: height,
            url: widgetUrl.toString()
        });
        
        const iframe = document.createElement('iframe');
        iframe.id = 'irdecode-widget-' + index;
        iframe.src = widgetUrl.toString();
        iframe.style.cssText = 'width: 100%; height: ' + height + 'px; border: none; border-radius: 12px; display: block; background: transparent;';
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('allow', 'clipboard-write');
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-modals');
        iframe.setAttribute('title', 'IRdecode Advocacy Widget');
        iframe.setAttribute('loading', 'lazy');
        
        container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: ' + height + 'px; background: #fafafa; border-radius: 12px; border: 1px solid #e5e5e5;"><div style="text-align: center;"><div style="width: 40px; height: 40px; margin: 0 auto 16px; border: 4px solid #e5e5e5; border-top-color: #171717; border-radius: 50%; animation: spin 0.8s linear infinite;"></div><p style="margin: 0; color: #737373; font-size: 14px;">Loading widget...</p></div></div><style>@keyframes spin { to { transform: rotate(360deg); } }</style>';
        
        iframe.onload = function() {
            log('Widget loaded successfully');
            const loader = container.querySelector('[style*="Loading widget"]');
            if (loader && loader.parentElement) {
                loader.parentElement.remove();
            }
        };
        
        iframe.onerror = function() {
            error('Widget failed to load');
            container.innerHTML = '<div style="padding:40px;text-align:center;border:2px solid #fca5a5;border-radius:12px;background:#fef2f2;"><div style="font-size:48px;margin-bottom:16px;">⚠️</div><h3 style="margin:0 0 8px;color:#dc2626;">Failed to Load Widget</h3><p style="margin:0;color:#7f1d1d;font-size:14px;">Please check your API key or contact support@irdecode.com</p></div>';
        };
        
        container.appendChild(iframe);
        
        setupResize(iframe);
    }
    
    function setupResize(iframe) {
        window.addEventListener('message', function(event) {
            try {
                const widgetOrigin = new URL(CONFIG.WIDGET_URL).origin;
                if (event.origin !== widgetOrigin) {
                    return;
                }
                
                if (event.data.type === 'resize' && event.data.height) {
                    log('Resizing iframe to', event.data.height, 'px');
                    iframe.style.height = event.data.height + 'px';
                }
            } catch (e) {
                // Ignore invalid messages
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
    if (window.MutationObserver) {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.hasAttribute && node.hasAttribute('data-irdecode-widget')) {
                        log('New widget detected, initializing...');
                        createWidget(node, Date.now());
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    log('Embed script loaded');
})();
