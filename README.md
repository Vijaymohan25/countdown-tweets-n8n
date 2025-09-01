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

Pipeline Worflow

<img width="1903" height="919" alt="Screenshot 2025-09-01 183858" src="https://github.com/user-attachments/assets/86185dfe-65ec-4b78-8093-3a0d36780e32" />


Output

![WhatsApp Image 2025-09-01 at 18 53 19_8bf8ce04](https://github.com/user-attachments/assets/513585ce-1123-43f8-a322-b06f6da6cb19)


This output is configured for a manual trigger. To schedule the post, please update the cron job with your preferred time settings.
