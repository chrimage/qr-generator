# No Bullshit QR Generator

A fast, client-side QR code generator with zero tracking, no ads, and no premium features. Just pure functionality.

🔗 **Live Demo**: [qr.bytecrash.xyz](https://qr.bytecrash.xyz)

## Features

- **9 QR Code Types**: Text, URL, WiFi, Email, SMS, Phone, vCard, Calendar Events, and Geo Location
- **Client-Side Generation**: All QR codes generated in your browser - no server calls
- **Customizable**: Size (128px to 1024px), colors, and error correction levels
- **Download Support**: High-resolution PNG downloads at your selected size
- **Copy to Clipboard**: Copy QR code images directly to clipboard
- **No Bullshit**: No ads, no tracking, no premium features, no registration

## QR Code Types Supported

| Type | Description | Example Use Case |
|------|-------------|------------------|
| 📝 Text | Plain text content | Messages, notes, instructions |
| 🔗 URL | Website links | Share websites, social profiles |
| 📶 WiFi | Network credentials | Share WiFi password with guests |
| 📧 Email | Email composition | Pre-filled contact emails |
| 💬 SMS | Text message | Pre-filled SMS to phone numbers |
| 📞 Phone | Phone numbers | Quick dial numbers |
| 👤 vCard | Contact information | Digital business cards |
| 📅 Calendar | Calendar events | Meeting invitations, reminders |
| 📍 Location | GPS coordinates | Share locations, addresses |

## Tech Stack

- **Frontend**: React 19 + TypeScript + Tailwind CSS v4
- **QR Generation**: [qrcode](https://www.npmjs.com/package/qrcode) library
- **Build Tool**: Vite
- **Deployment**: Cloudflare Workers (Static Assets)
- **Domain**: Custom domain with Cloudflare

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare Workers
npm run deploy
```

## Project Structure

```
src/
├── components/
│   ├── forms/          # Form components for each QR type
│   ├── QRGenerator.tsx # Main generator component
│   └── QRPreview.tsx   # QR code preview and download
├── types/
│   └── qr-types.ts     # TypeScript definitions
├── utils/
│   └── qr-formatters.ts # Data formatting for QR codes
└── main.tsx
```

## Deployment

This app is deployed as a static site on Cloudflare Workers with a custom domain. The deployment process:

1. Build the React app with Vite
2. Deploy static assets to Cloudflare Workers
3. Route traffic through custom domain (qr.bytecrash.xyz)

## Why "No Bullshit"?

Most QR code generators online are loaded with:
- Intrusive ads
- User tracking
- Premium feature paywalls
- Mandatory registrations
- Server-side generation (privacy concerns)

This generator does none of that. It's built by developers who hate ads and believe in simple, functional tools.

## License

MIT License - feel free to fork, modify, and use for any purpose.

---

⚡ Made with zero bullshit by developers who hate ads 💜