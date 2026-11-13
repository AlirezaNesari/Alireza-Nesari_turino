# Turino

An online tour-booking website for domestic and international tours. Final bootcamp project, built with Next.js and the provided `travel-agency-api` backend.

## Features

- Tour search by origin, destination and a Jalali (Persian calendar) date range, rendered on the server with filters stored in the URL
- Tour list and a details page for each tour
- Login with a mobile number and a one-time code (OTP), with tokens stored in httpOnly cookies
- Tour reservation, passenger details form and final purchase
- Profile (account, personal and bank information), my tours and transactions
- Responsive (mobile-first) and right-to-left layout

## Tech stack

Next.js (App Router), TypeScript, Tailwind CSS, React Query, Axios, React Hook Form + Yup, Zustand, react-toastify, react-loader-spinner, jalaali-js

## Getting started

### 1. Run the backend (port 6500)

```bash
cd travel-agency-api
npm i
npm start
```

### 2. Run the frontend

```bash
cd turino
npm i
cp .env.example .env.local
npm run dev
```

On Windows PowerShell, use `Copy-Item .env.example .env.local` instead of `cp`.

The site is available at `http://localhost:3000`.

### Production build

```bash
npm run build
npm start
```

## Environment variables

| Name            | Description                                       |
| --------------- | ------------------------------------------------- |
| `API_URL`       | Backend address. Default: `http://localhost:6500` |
| `COOKIE_SECURE` | Set to `true` when the site is served over HTTPS  |

## Notes

- The backend does not send real SMS messages. The OTP code is printed in the backend terminal (in development mode it is also shown in a toast).
- The sample tours have dates in the Jalali year 1404. To test the date filter, go back to that year in the calendar.
- The browser only talks to the `/api/*` routes of Next.js. Tokens are kept in httpOnly cookies and are refreshed automatically when the access token expires.
- Protected pages (`/profile` and `/checkout`) redirect to the home page and open the login modal when the user is not signed in.

## Project structure

```
src/
├── app/          Pages and Route Handlers
├── components/   UI components (auth, home, tour, checkout, profile, ui, layout)
├── services/     API calls
├── hooks/        Custom hooks
├── store/        Zustand store
├── lib/          HTTP client and server-side helpers
├── utils/        Jalali dates, formatting, validation
└── constants/    Cities and vehicle types
```

## Pages and rendering

| Page                            | Route                                                 | Rendering        |
| ------------------------------- | ----------------------------------------------------- | ---------------- |
| Home (search and tour list)     | `/`                                                   | SSR              |
| Tour details                    | `/tours/[tourId]`                                     | ISR (60 seconds) |
| Checkout                        | `/checkout`                                           | CSR, protected   |
| Profile, my tours, transactions | `/profile`, `/profile/tours`, `/profile/transactions` | CSR, protected   |
| Services, about, contact        | `/services`, `/about`, `/contact`                     | Static           |
