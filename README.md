# Apple Financial Data Dashboard

A React-based dashboard that displays and analyzes Apple Inc.'s financial data. Built with Next.js and Tailwind CSS.

## Live Demo

Visit the live application: [https://aapl-chi.vercel.app/](https://aapl-chi.vercel.app/)

## Features

- Display financial metrics in a responsive table
- Filter data by:
  - Date range
  - Revenue range
  - Net Income range
- Sort data by:
  - Date
  - Revenue
  - Net Income
- Responsive design for mobile and desktop

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Srasulova/aapl.git
```

2. Navigate to the project directory:

```bash
cd aapl
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Create a `.env.local` file in the root directory and add your API configuration:

```bash
FINANCIAL_API_URL=https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=YOUR_API_KEY
```

## Running the Application

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Programming language
