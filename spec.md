# SnapCache

## Current State
New project. No existing application files beyond the empty scaffold.

## Requested Changes (Diff)

### Add
- A message saving app with a floating overlay UI inspired by Snapchat workflows
- Backend: store saved messages (text content, timestamp, sender, conversation label)
- One-click "Save All" button prominently shown in overlay
- A dashboard/inbox view to browse all saved messages grouped by conversation
- Individual message copy-to-clipboard action
- Bulk export (copy all) option
- Delete individual messages or clear all
- Sample/demo messages pre-loaded so the app looks useful on first load

### Modify
N/A — new project

### Remove
N/A — new project

## Implementation Plan
1. Backend (Motoko):
   - `Message` record type: id, sender, content, conversationLabel, timestamp
   - `saveMessages(messages: [Message])` — bulk save an array of messages
   - `getMessages()` — return all saved messages sorted by timestamp desc
   - `deleteMessage(id: Text)` — remove a single message
   - `clearAll()` — wipe all messages
   - Seed with sample data on first call if empty

2. Frontend:
   - Dark landing/marketing page (SnapCache branding, yellow accent on near-black)
   - Floating overlay panel (bottom-right corner) simulating the Snapchat-like save overlay:
     - Text area to paste/type messages
     - "Save All" one-click button
     - Minimise/expand toggle
   - Saved Messages dashboard below the hero:
     - Grouped by conversationLabel
     - Each message card shows sender, content, timestamp, copy icon, delete icon
     - "Copy All" + "Clear All" buttons at the top
   - Responsive, mobile-friendly
