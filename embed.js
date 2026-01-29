/**
 * IRdecode Advocacy Widget Embed Script
 * Version: 2.1.0
 * Production-ready with comprehensive error handling
 */

(function() {
    'use strict';
    
    // Configuration
    var CONFIG = {
        WIDGET_URL: 'https://irdecode.com/widgets',
        DEFAULT_HEIGHT: 950,
        RESIZE_ENABLED: true,
        DEBUG: false,
        RETRY_ATTEMPTS: 3,
        RETRY_DELAY: 1000
    };
    
    // Logging utilities
    var log = function() {
        if (CONFIG.DEBUG) {
            var args = Array.prototype.slice.call(arguments);
            console.log.apply(console, ['[IRdecode Widget]'].concat(args));
        }
    };
    
    var error = function() {
        var args = Array.prototype.slice.call(arguments);
        console.error.apply(console, ['[IRdecode Widget]'].concat(args));
    };
    
    // Initialize all widgets
    function initWidget() {
        log('Initializing widgets...');
        
        var containers = document.querySelectorAll('[data-irdecode-widget]');
        
        if (containers.length === 0) {
            log('No widget containers found. Add data-irdecode-widget attribute to use widget.');
            return;
        }
        
        log('Found ' + containers.length + ' widget container(s)');
        
        // Convert NodeList to Array for IE compatibility
        var containersArray = Array.prototype.slice.call(containers);
        
        containersArray.forEach(function(container, index) {
            try {
                createWidget(container, index);
            } catch (err) {
                error('Failed to create widget:', err);
                showError(container, 'Failed to initialize widget: ' + err.message);
            }
        });
    }
    
    // Create individual widget
    function createWidget(container, index) {
        // Extract configuration from data attributes
        var apiKey = container.getAttribute('data-api-key');
        var campaign = container.getAttribute('data-campaign') || 'iran-irgc-terrorist-2026';
        var height = container.getAttribute('data-height') || CONFIG.DEFAULT_HEIGHT;
        var theme = container.getAttribute('data-theme') || 'default';
        
        // Validate API key
        if (!apiKey) {
            error('Missing data-api-key attribute on widget container');
            showApiKeyError(container);
            return;
        }
        
        log('Creating widget ' + (index + 1) + ':', {
            apiKey: apiKey.substring(0, 10) + '...',
            campaign: campaign,
            height: height,
            theme: theme
        });
        
        // Build widget URL
        var widgetUrl;
        try {
            widgetUrl = buildWidgetUrl(apiKey, campaign, theme);
        } catch (err) {
            error('Failed to build widget URL:', err);
            showError(container, 'Configuration error');
            return;
        }
        
        log('Widget URL:', widgetUrl);
        
        // Create iframe
        var iframe = createIframe(widgetUrl, height, index);
        
        // Show loading state
        showLoading(container, height);
        
        // Setup iframe event handlers
        iframe.onload = function() {
            log('Widget ' + (index + 1) + ' loaded successfully');
            hideLoading(container);
        };
        
        iframe.onerror = function() {
            error('Widget ' + (index + 1) + ' failed to load');
            showError(container, 'Failed to load widget. Please check your API key or contact support@irdecode.com');
        };
        
        // Add iframe to container
        container.appendChild(iframe);
        
        // Setup auto-resize
        if (CONFIG.RESIZE_ENABLED) {
            setupResize(iframe);
        }
    }
    
    // Build widget URL with parameters
    function buildWidgetUrl(apiKey, campaign, theme) {
        var url = CONFIG.WIDGET_URL;
        var params = [
            'apiKey=' + encodeURIComponent(apiKey),
            'campaign=' + encodeURIComponent(campaign),
            'theme=' + encodeURIComponent(theme),
            'embedded=true',
            'parent=' + encodeURIComponent(window.location.hostname)
        ];
        
        return url + '?' + params.join('&');
    }
    
    // Create iframe element
    function createIframe(src, height, index) {
        var iframe = document.createElement('iframe');
        iframe.id = 'irdecode-widget-' + index;
        iframe.src = src;
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('allow', 'clipboard-write');
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-modals');
        iframe.setAttribute('title', 'IRdecode Advocacy Widget');
        iframe.setAttribute('loading', 'lazy');
        
        // Set styles
        iframe.style.cssText = [
            'width: 100%',
            'height: ' + height + 'px',
            'border: none',
            'border-radius: 12px',
            'display: block',
            'background: transparent'
        ].join('; ');
        
        return iframe;
    }
    
    // Show loading state
    function showLoading(container, height) {
        var loadingDiv = document.createElement('div');
        loadingDiv.className = 'irdecode-widget-loading';
        loadingDiv.setAttribute('data-loading', 'true');
        
        loadingDiv.style.cssText = [
            'display: flex',
            'align-items: center',
            'justify-content: center',
            'height: ' + height + 'px',
            'background: #fafafa',
            'border-radius: 12px',
            'border: 1px solid #e5e5e5',
            'position: absolute',
            'top: 0',
            'left: 0',
            'right: 0',
            'z-index: 10'
        ].join('; ');
        
        loadingDiv.innerHTML = [
            '<div style="text-align: center;">',
            '  <div class="irdecode-spinner" style="width: 40px; height: 40px; margin: 0 auto 16px; border: 4px solid #e5e5e5; border-top-color: #171717; border-radius: 50%; animation: irdecode-spin 0.8s linear infinite;"></div>',
            '  <p style="margin: 0; color: #737373; font-size: 14px; font-family: -apple-system, sans-serif;">Loading widget...</p>',
            '</div>'
        ].join('');
        
        // Add animation
        if (!document.getElementById('irdecode-widget-styles')) {
            var style = document.createElement('style');
            style.id = 'irdecode-widget-styles';
            style.textContent = '@keyframes irdecode-spin { to { transform: rotate(360deg); } }';
            document.head.appendChild(style);
        }
        
        container.style.position = 'relative';
        container.appendChild(loadingDiv);
    }
    
    // Hide loading state
    function hideLoading(container) {
        var loading = container.querySelector('[data-loading="true"]');
        if (loading && loading.parentNode) {
            loading.parentNode.removeChild(loading);
        }
    }
    
    // Show API key error
    function showApiKeyError(container) {
        container.innerHTML = [
            '<div style="padding: 40px; text-align: center; border: 2px dashed #e5e5e5; border-radius: 12px; background: #fafafa; font-family: -apple-system, sans-serif;">',
            '  <div style="font-size: 48px; margin-bottom: 16px;">🔒</div>',
            '  <h3 style="margin: 0 0 8px; color: #171717; font-size: 18px; font-weight: 600;">API Key Required</h3>',
            '  <p style="margin: 0; color: #737373; font-size: 14px; line-height: 1.6;">',
            '    Add <code style="background: #e5e5e5; padding: 2px 6px; border-radius: 4px; font-family: monospace;">data-api-key="your_key"</code> to the widget container.',
            '    <br><br>',
            '    <a href="https://irdecode.com/api-keys" style="color: #171717; font-weight: 600; text-decoration: none;">Get your API key →</a>',
            '  </p>',
            '</div>'
        ].join('');
    }
    
    // Show generic error
    function showError(container, message) {
        hideLoading(container);
        
        container.innerHTML = [
            '<div style="padding: 40px; text-align: center; border: 2px solid #fca5a5; border-radius: 12px; background: #fef2f2; font-family: -apple-system, sans-serif;">',
            '  <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>',
            '  <h3 style="margin: 0 0 8px; color: #dc2626; font-size: 18px; font-weight: 600;">Widget Error</h3>',
            '  <p style="margin: 0; color: #7f1d1d; font-size: 14px; line-height: 1.6;">',
                   message,
            '  </p>',
            '</div>'
        ].join('');
    }
    
    // Setup iframe auto-resize
    function setupResize(iframe) {
        window.addEventListener('message', function(event) {
            // Verify origin
            var widgetOrigin;
            try {
                widgetOrigin = new URL(CONFIG.WIDGET_URL).origin;
            } catch (e) {
                error('Invalid widget URL:', CONFIG.WIDGET_URL);
                return;
            }
            
            if (event.origin !== widgetOrigin) {
                return;
            }
            
            // Handle resize message
            if (event.data && event.data.type === 'resize' && event.data.height) {
                log('Resizing iframe to ' + event.data.height + 'px');
                iframe.style.height = event.data.height + 'px';
            }
        });
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
    
    // Watch for dynamically added widgets
    if (window.MutationObserver) {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                var nodes = Array.prototype.slice.call(mutation.addedNodes);
                nodes.forEach(function(node) {
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
    
    log('Embed script loaded and ready');
})();
