# Sales Dashboard (Next.js 15 · TypeScript · TailwindCSS · Recharts)

A small dashboard that visualizes **yearly sales** of retail data (2022–2024) with an **atomic design** component structure.

## Features

- **Custom Filter Input** - An input field to let users set their own sales threshold
- **API Integration** - Fetches real data from the API using JSON server and Axios
- **Multiple Chart Types** - Added buttons to switch between bar, line, or pie charts using Recharts components

## Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Recharts** - Chart library for React
- **JSON Server** - Mock API server for development
- **Axios** - HTTP client for API requests

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the JSON server (in one terminal):
```bash
npm run json
```

3. Start the development server (in another terminal):
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── component/
│   │   ├── Dashboard.tsx          # Main dashboard component
│   │   ├── FilterPanel.tsx       # Sales threshold filter
│   │   ├── LineChartComponent.tsx
│   │   ├── BarChartComponent.tsx
│   │   ├── PieChartComponent.tsx
│   │   └── card.tsx              # Reusable card components
│   └── layout.tsx
├── types/
│   └── index.ts                  # TypeScript type definitions
└── api/
    ├── app.ts                    # API functions
    └── data.json                 # sales data
```

## Usage

1. **Set Sales Threshold** - Use the filter panel to set minimum and maximum sales amounts
2. **Date Range Filter** - Select start and end dates to filter the data
3. **Chart Selection** - Click the chart type buttons to switch between different visualizations
4. **Clear Filters** - Use the clear button to reset all filters

## Data

The dashboard displays sales data from 2022-2023 including:
- Transaction details
- Customer demographics
- Product categories
- Sales amounts and quantities

All data is fetched dynamically from the JSON server API and filtered based on user input.
