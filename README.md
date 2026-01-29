<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Iran Advocacy Widget

A powerful, embeddable email advocacy tool that helps amplify Iranian voices by generating personalized messages to government officials using AI.

## 🌟 Features

- **AI-Powered Email Generation** - Uses GPT-4 to craft compelling, personalized advocacy emails
- **Emotion-Driven Messaging** - 8 emotional tones to match user sentiment
- **One-Click Embedding** - Simple script tag integration
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- **Secure \& Validated** - API key + domain restriction authentication
- **Rate Limited** - Built-in protection against abuse (10 requests/minute per partner)
- **Multi-Language Support** - Detects user input language and generates English emails
- **Customizable** - Flexible styling and configuration options


## 🚀 Quick Start

### Basic Embed (2 lines of code)

```html
<div data-irdecode-widget data-api-key="YOUR_API_KEY" data-campaign="iran-irgc-terrorist-2026"></div>
<script src="https://widgets.irdecode.com/embed.js" async></script>
```


### Full HTML Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iran Advocacy Campaign</title>
    <style>
        [data-irdecode-widget] {
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
        }
        [data-irdecode-widget] iframe {
            width: 100% !important;
            border: none;
        }
    </style>
</head>
<body>
    <div 
        data-irdecode-widget
        data-api-key="YOUR_API_KEY"
        data-campaign="iran-irgc-terrorist-2026">
    </div>
    
    <script src="https://widgets.irdecode.com/embed.js" async></script>
</body>
</html>
```


## 🔑 Getting an API Key

1. **Contact IRdecode**: Email support@irdecode.com with:
    - Your organization name
    - Website domain where widget will be embedded
    - Campaign purpose
2. **Receive credentials**:
    - API key
    - Approved domain(s)
3. **Domain must match**: Widget validates that embed domain matches your registered domain

## 📦 Platform Integration

### WordPress

Add to Custom HTML block:

```html
<div data-irdecode-widget data-api-key="YOUR_API_KEY" data-campaign="iran-irgc-terrorist-2026"></div>
<script src="https://widgets.irdecode.com/embed.js" async></script>
```


### Wix

1. Add **Embed Code** element
2. Paste widget code
3. Resize as needed

### Squarespace

1. Add **Code Block**
2. Paste widget code
3. Save and publish

### React/Next.js

```jsx
import { useEffect } from 'react';

export default function AdvocacyWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widgets.irdecode.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div 
      data-irdecode-widget
      data-api-key="YOUR_API_KEY"
      data-campaign="iran-irgc-terrorist-2026"
    />
  );
}
```


## 🛡️ Security Features

### API Key Validation

- Keys validated against Google Sheets database
- Must be marked as "approved"
- Checked on every request


### Domain Restriction

- Widget validates embedding domain
- Prevents unauthorized use
- Supports wildcards for subdomains (`*.example.com`)


### Rate Limiting

- 10 requests per minute per partner
- Automatic reset window
- 429 error response when exceeded


### Input Sanitization

- HTML tags stripped
- XSS protection
- Length validation (5-500 characters)

# 🎨 Customization

The widget supports extensive customization via props:

- **Colors**: Primary, background, text, borders
- **Header**: Image, title, subtitle, overlay
- **Dimensions**: Max width, spacing, border radius
- **Features**: Character count, help text, footer
- **Content**: Labels, placeholders, button text

*Contact IRdecode for custom theming options.*

## 🐛 Troubleshooting

### Widget doesn't appear

1. Check browser console for errors
2. Verify API key is correct
3. Confirm domain is authorized
4. Check CORS headers
5. Test script loads: `curl -I https://widgets.irdecode.com/embed.js`

### "Domain not authorized" error

- Ensure your domain matches Google Sheets entry exactly
- Check for `www.` vs non-www
- Verify HTTPS vs HTTP


### Widget too narrow

```html
<style>
[data-irdecode-widget] iframe {
    width: 100% !important;
    max-width: 100% !important;
}
</style>
```


