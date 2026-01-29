# Iran Advocacy Widget

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/irdecode/iran-advocacy-widget)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Embeddable widget for generating personalized advocacy emails to government officials regarding Iran human rights issues.

## 🚀 Quick Start

Add this code to your website:

```html
<div id="iran-advocacy-widget"></div>
<script src="https://widgets.irdecode.com/embed.js"></script>

🔑 Getting an API Key
Contact IRdecode: Email support@irdecode.com with:

Your organization name

Website domain where widget will be embedded

Campaign purpose

Receive credentials:

API key

Approved domain(s)

Domain must match: Widget validates that embed domain matches your registered domain

📦 Platform Integration
WordPress
Add to Custom HTML block:

xml
<div data-irdecode-widget data-api-key="YOUR_API_KEY" data-campaign="iran-irgc-terrorist-2026"></div>
<script src="https://widgets.irdecode.com/embed.js" async></script>
Wix
Add Embed Code element

Paste widget code

Resize as needed

Squarespace
Add Code Block

Paste widget code

Save and publish

React/Next.js
jsx
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
