# The Bootroom – Step 2: Ticket PDF + QR

Includes:
- Step 1 Registration UI (retro, responsive, 10-player accordion)
- Step 2 Ticket PDF generation + QR
  - Server Action creates a signed `teamToken`
  - In-memory store (dev) keeps the submitted team payload
  - `/api/ticket/[teamToken]` generates a premium PDF ticket with embedded QR

## Run
```bash
cp .env.example .env.local
npm install
npm run dev
```
Open http://localhost:3000/register

> In Step 3 we’ll replace the in-memory store with MongoDB + S3/R2.
