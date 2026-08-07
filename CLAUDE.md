# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

React 18 SPA (Create React App, class components) for the Clothes Closet appointment system. It is a pure frontend — all data comes from the `clothes-closet-rest` backend (https://github.com/jvalentino/clothes-closet-rest), which must be running locally for dev work.

## Commands

```bash
npm run start:dev   # dev server on :3000 against local backend (.env.development)
npm start           # dev server against the PRODUCTION backend (.env.production)
npm test            # all tests, single run, with coverage
npm run test:watch  # watch mode
npm run build:dev   # prettier + eslint + test + build (what the pre-commit hook runs)
npm run build       # test + production build (what Heroku runs)
npm run prettier    # prettier-eslint --write over src/**/*.js
npm run eslint      # eslint --fix, HTML report to build-reports/eslint.html
```

Run a single test file or test:

```bash
npx react-scripts test --watchAll=false src/view/home/home-controller.test.js
npx react-scripts test --watchAll=false -t "when success"
```

Note `npm start` (no `:dev`) points at production services — use `start:dev` for local work.

## Environment configuration

Env files are selected explicitly via `env-cmd` in the npm scripts; CRA's default env resolution is not used. Dev and prod differ only in the backend URL and the appointments flag:

- `REACT_APP_HTTP_API` — backend base URL
- `REACT_APP_OAUTH_CLIENT_ID` — Google OAuth client
- `REACT_APP_ENABLE_APPOINTMENTS` — feature flag; when `false`, `Home` renders a "registration closed" message instead of the scheduling form. Toggling this in `.env.production` and committing is how public registration is opened/closed (see recent git history).

Env values are read only through `AppState`, never directly in views.

## Architecture

**View / controller split.** Every screen under `src/view/<name>/` is a pair:

- `Name.js` — a React class component: renders, holds `state`, and handles user events. Loads data in `componentDidMount`, sets `state.data`, and renders `<ProgressView />` while it is still null.
- `name-controller.js` — plain async functions that own all `fetch` calls and response massaging. These have no React dependency, which is what makes them unit-testable; `*-controller.test.js` files are where the real test coverage lives.

Views take dependencies as explicit arguments from `AppState` (`AppState.getSessionId()`, `AppState.getUrl()`, `AppState.getTimeZone()`) and pass them into controller functions — controllers never import `AppState`.

**`src/AppState.js`** is a frozen singleton wrapping `universal-cookie` plus env vars. It is the only place cookies (`clothes-closet-session-id`, `-appointment-id`, `-language`, `-text-align`, `-logged-in-name`, `-logged-in-picture`) and `process.env` are touched. There is no Redux/Context — cross-page state travels through these cookies.

**Auth.** Google OAuth via `@react-oauth/google`; `index.js` wraps `<App />` in `GoogleOAuthProvider`. `Login` posts the credential to `POST /oauth`, then stores the returned session id via `AppState.markLoggedIn(...)`. Authenticated calls pass the session id as an `x-auth-token` **query parameter** on the URL, not a header. Routes are not guarded in `App.js` — protected pages simply fail their backend calls without a valid session.

**Routing** is a flat `<Routes>` list in `src/App.js`. `/` (Home) and `/thankyou` are public; the rest are staff-facing.

**HTTP.** `src/util/http-util.js` (`request(url, type, parameters, body)` + query-string builder) is the shared helper, but several controllers still hand-roll `fetch`. Match whichever the surrounding file uses.

**Localization.** `src/locale.js` is a single `react-localization` `LocalizedStrings` object with `en` and `es` keys — add every new user-facing string to both. Use `strings.formatString(strings.key, { placeholder })` for interpolation. The chosen language persists in a cookie; `AppState.getTextAlign()` exists to support RTL-ish layout tweaks. Controllers import `strings` to rewrite backend error codes (`STUDENT_IDS`, `BOOKED`, `ALREADY_BEEN`) into localized messages — see `home-controller.js`.

**Shared pieces** under `src/component/`: `Banner` (header, on every page), `ProgressView` (loading spinner), `error-modal.js` (`display(messages)` — a `react-confirm-alert` popup used for validation errors), `ApptEntry` (the guardian/students form shared by Home and ManualEntry), `DateTime`, `RescheduleModal`.

**Date/time.** `src/util/input-util.js` and `time-zone-util.js` hold all ISO-8601 / display-format conversions. The backend works in ISO and the UI converts on the way in and out; the browser time zone is sent explicitly on many calls. `AppState.getTimeSlotLengthInMinutes()` (20) is the calendar slot size for FullCalendar.

## Testing

Jest via `react-scripts` with `jest-fetch-mock` enabled globally in `src/setupTests.js`. Controller tests call `fetch.mockResponseOnce(JSON.stringify(...))` and assert on the exact URL and request options passed to `fetch`; `beforeEach(() => fetch.resetMocks())` is the standard preamble. The few component tests use `@testing-library/react` `render` + `screen`. Tests follow a given/when/then comment structure.

## Conventions

- Class components with `this.xxx = this.xxx.bind(this)` in the constructor; no hooks anywhere.
- Prettier + ESLint (`.eslintrc.json`, `@babel/eslint-parser`, react plugins) are enforced by `build:dev`, which the husky pre-commit hook runs — a commit fails if formatting, lint, or tests fail.
- Deployed on Heroku (`Procfile` runs `npm run start`).
