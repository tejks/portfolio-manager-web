<div align="center">
  <img src="docs/assets/cash.svg" alt="phone icon" width="150" height="150" />

  <h2 align="center">Portfolio Manager Web</h2>
</div>

</br>

A lightweight front-end application for managing a portfolio of various assets (cryptocurrencies, tokens, stocks, etc.). The app provides portfolio overview, transaction history, add/edit transactions and connects to backend services for auth and data.


## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running](#running)
- [Configuration](#configuration)
- [Key Files](#key-files)
- [Contributing](#contributing)
- [License](#license)

## Overview

Built with Vite, React and TypeScript, this repository contains the front-end of a Portfolio Manager application. It consumes backend APIs (auth, tokens, transactions) to display current balances, token metadata and transaction history.

## Features

- Portfolio overview with current values
- Asset list with search and filtering
- Token/asset detail view with live price display
- Add / edit transactions (buy, sell, transfer)
- Transactions history with sorting and pagination
- User authentication (login / signup)

## Technologies

- React + TypeScript
- Vite
- Tailwind CSS, PostCSS, SCSS
- Redux Toolkit (`src/store`)
- Fetch / Axios (`src/common/API/services`)

## Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Running backend API (local or remote) for full integration

## Installation

Clone the repository and install dependencies:

```sh
git clone <repo-url>
cd portfolio-manager-web
npm install
# or
yarn
```

## Running

Run in development mode (Vite):

```sh
npm run dev
```

Build for production and preview:

```sh
npm run build
npm run preview
```

## Configuration

Main configuration is available in `src/config/env.ts`.

Example `.env` variables:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_NODE_ENV=development
```

Ensure the backend services (auth, tokens, transactions) are reachable at the address configured in `VITE_API_BASE_URL`.

## Key Files

- `src/main.tsx` — application entry point
- `src/index.scss` — global styles
- `src/store` — Redux store configuration
- `src/components` — UI components (tables, forms, modals)
- `src/pages` — application pages (Portfolio, Token, Transactions, Auth)
- `src/common/API/services` — API services (`auth.ts`, `tokens.ts`, `transactions.ts`)

## Contributing

- Open issues for bugs or feature requests
- Fork, create a branch, and submit a pull request
- Run linters and ensure the project builds before PR

## License

This project is licensed under the MIT License.

