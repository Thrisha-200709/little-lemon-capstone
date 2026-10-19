# Little Lemon — React Booking Capstone

A responsive React table-reservation form created as a front-end learning capstone. It includes client-side validation, date-based demo availability, accessible form labels and errors, a confirmation state, and unit tests.

> **Important:** This is a front-end demonstration. It does not save bookings to a server or send a real reservation to Little Lemon.

## Features

- Responsive layout for desktop, tablet, and mobile.
- Booking date, available time, guest count, and occasion fields.
- Validation for required fields, past dates, and guest counts (1–10).
- Accessible labels, `aria-invalid`, error descriptions, and live confirmation feedback.
- Unit tests for booking helpers and validation.

## Requirements

- Node.js 18 or later
- npm
- VS Code (recommended)

## Run locally

1. Download or clone this repository.
2. Open the project folder in VS Code.
3. Open the integrated terminal.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Run tests

Run tests in watch mode:

```bash
npm test
```

Run once:

```bash
npm run test:run
```

Build for production:

```bash
npm run build
```

## Project structure

```text
little-lemon-capstone/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.jsx
    ├── booking.js
    ├── booking.test.jsx
    ├── main.jsx
    └── styles.css
```

## Availability note

The available times are generated locally for demonstration purposes. This project does not connect to a restaurant booking API or persist reservations.

## Before submitting

- Run `npm install`, `npm run test:run`, and `npm run build`.
- Review the course's exact capstone requirements and compare them with this implementation.
- Make sure you can explain the code and adjust it to any required starter-code conventions.
- Push the project to a GitHub repository under your own account and submit that repository URL.
