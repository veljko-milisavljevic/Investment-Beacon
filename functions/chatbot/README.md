# Chatbot function (Appwrite)

Server-side part of the Investment Beacon AI assistant. The mobile app calls this function with `functions.createExecution(...)`, and the function forwards the prompt to OpenAI (`gpt-4o-mini`). The API key stays on the server.

Based on Appwrite's *Prompt ChatGPT* function template.

| Setting | Value |
|---|---|
| Runtime | Node 18+ |
| Entrypoint | `src/main.js` |
| Build command | `npm install` |
| Env vars | `OPENAI_API_KEY` (required), `OPENAI_MAX_TOKENS` (optional, default 512) |

**Request:** `POST` with JSON body `{ "prompt": "What is an ETF?" }`
**Response:** `{ "ok": true, "completion": "..." }`, or `{ "ok": false, "error": "..." }` with status 400 or 500.

`GET /` serves a small HTML test page from `static/index.html`.
