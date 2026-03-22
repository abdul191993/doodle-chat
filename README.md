# Doodle Chat

A frontend assessment project for a lightweight chat experience built with React, TypeScript, Vite, Tailwind CSS, Axios, and TanStack Query.

The app connects to a messages API, asks the user for a display name, loads the latest conversation, polls for new data, supports loading older history, and allows sending new messages.

## What Is Implemented

### Product behavior

- Display-name capture before the user can participate in the chat
- Display-name validation and persistence in `localStorage`
- Chat UI with message bubbles and a conversation layout
- Initial fetch of the latest messages
- Infinite upward pagination for older messages using a `before` cursor
- Background polling every 5 seconds for fresh messages
- Message sending through the API
- De-duplication and chronological sorting across paginated results
- Loading, empty, and error states for the main chat flow
- Decoding of escaped message content such as unicode sequences and line breaks

### Technical choices

- `React 19` with `TypeScript`
- `Vite` for development and production builds
- `Tailwind CSS v4` for styling
- `TanStack Query` for server state, polling, pagination, and cache invalidation
- `Axios` for API communication and request/response interception
- `@` path alias for cleaner imports from `src`

## Project Structure

- `src/pages/chat-wrapper.page.tsx` contains the main page orchestration
- `src/components/` contains the modal, composer, message list, and message item UI
- `src/services/messages/` contains API service functions, query hooks, mutation hooks, and query keys
- `src/context/user.context.tsx` manages the persisted display name
- `src/utils/` contains message parsing, sorting, deduplication, time formatting, and username helpers

## API Assumptions

The current frontend expects:

- `GET /messages` with optional query params such as `limit` and `before`
- `POST /messages` with `{ author, message }`

The message shape used in the UI is:

```ts
type TMessage = {
  _id: string;
  message: string;
  author: string;
  createdAt: string;
};
```

## Local Setup

### Prerequisites

- Node.js 20+ recommended
- npm

### Environment Variables

Create a `.env` file in the project root:

```bash
VITE_API_BASE_URL=https://your-api-base-url
VITE_API_TOKEN=your_api_token_if_required
```

`VITE_API_BASE_URL` is required. The app will throw on startup if it is missing.

### Run

```bash
npm install
npm run dev
```

### Other Scripts

```bash
npm run build
npm run lint
npm run preview
```

## Verified Status

The current codebase was checked locally with:

- `npm run build`
- `npm run lint`

Both pass.

## What Is Pending Due To Time Constraints

These are the main gaps still visible in the current implementation:

- No automated tests have been added yet for components, hooks, or utilities
- New messages are refreshed via polling instead of a real-time transport such as WebSockets or SSE
- Sending a message does not use an optimistic update, so the UI waits for the mutation cycle
- Accessibility received baseline attention in forms and modal semantics, but there has not been a dedicated accessibility test pass

## Suggested Next Steps

1. Add `Vitest` and `React Testing Library` coverage for the critical chat flow.
3. Improve mutation UX with optimistic message insertion and clearer send/fetch error feedback.
4. Replace polling with a real-time approach if the backend supports it.
5. Add small product polish items such as better loading states.
