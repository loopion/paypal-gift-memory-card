# PayPal Gift Memory Book

A beautiful, privacy-first keepsake generator that turns PayPal contributions into a themed PDF memory book. Perfect for weddings, birthdays, and baby arrivals.

## Features

- **3 themes**: Wedding (champagne/gold), Birthday (pink/coral), Baby (sky/mint)
- **Bilingual**: UI and PDF in English, French, or both
- **Privacy-first**: Individual amounts are hidden — only the sender's name, message, and date appear per card. The total is shown only on the summary page
- **Live PayPal data** via the [PayPal Developer MCP](https://mcp.paypal.com)
- **Vector PDF** with selectable text and embedded fonts (via `@react-pdf/renderer`)

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Fetching Real Transactions (via Claude Code + PayPal MCP)

This project wires the PayPal MCP into Claude Code via `.mcp.json`. When you open this folder in Claude Code, Claude can call `list_transaction` directly.

1. Open Claude Code in this project folder
2. Fill in the date range in the form
3. Click **Copy Claude prompt** in the app — this copies a ready-made instruction
4. Paste it into Claude Code:
   > *"Fetch PayPal transactions from 2026-01-01 to 2026-03-31 using the PayPal MCP list_transaction tool, then save the result as JSON to public/data/transactions.json in this project."*
5. Claude will authenticate (OAuth prompt on first use) and write the file
6. Click the **↺** (Reload) button in the app — the preview and PDF update automatically

Alternatively, paste the raw JSON directly using the **Paste JSON** button, or upload a saved `transactions.json` file.

## PayPal MCP JSON Format

The app understands the standard PayPal Reporting API format:

```json
{
  "transaction_details": [
    {
      "transaction_info": {
        "transaction_id": "XYZ123",
        "transaction_date": "2026-04-15T10:30:00.000Z",
        "transaction_amount": { "value": "50.00", "currency_code": "EUR" },
        "transaction_note": "Félicitations pour votre mariage!"
      },
      "payer_info": {
        "payer_name": { "full_name": "Sophie Dubois" }
      }
    }
  ]
}
```

It also accepts a simplified flat array: `[{ id, senderName, message, amount, currency, date }]`.

Only transactions with a non-empty `transaction_note` are included.

## Project Structure

```
src/
  types.ts          — shared TypeScript types
  i18n/             — EN/FR translations + t() helper
  themes/           — wedding, birthday, baby theme configs
  lib/
    mockData.ts     — 10 sample contributions for preview
    filters.ts      — date filtering, formatting utilities
    transactions.ts — PayPal JSON parsing + file loader
  pdf/
    fonts.ts        — Google Fonts registration for @react-pdf/renderer
    styles.ts       — theme-aware StyleSheet factory
    CoverPage.tsx   — themed cover page
    ContributionCard.tsx — single contribution (name + message + date)
    SummaryPage.tsx — totals and thank-you
    GiftMemoryBookPDF.tsx — Document root
  components/
    ThemePicker.tsx       — 3-option visual theme selector
    LanguageToggle.tsx    — EN/FR UI toggle
    InputForm.tsx         — form inputs
    TransactionImport.tsx — paste/upload/reload/copy-prompt controls
    PreviewPanel.tsx      — PDFViewer + download button
  App.tsx           — top-level state and layout
public/
  data/             — drop transactions.json here for live reload
```

## Build

```bash
npm run build   # → dist/
npm run preview # serve the production build locally
```
