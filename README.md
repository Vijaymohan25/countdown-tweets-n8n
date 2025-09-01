# Countdown Tweets Workflow (n8n)

This workflow posts daily countdown tweets (`T-5 days…T-1 day…Today!`) for upcoming events.

## Features
- Fetch events from Google Sheets
- Auto-generate countdown messages
- Post tweets via X API
- Prevents duplicate posting with filters/logs

## Usage
1. Import `countdown-tweets.json` into your n8n instance.
2. Set credentials for Google Sheets and X.
3. Activate the workflow.
