# Crypto Price Tracker

Welcome to the Crypto Price Tracker documentation! This project consists of a Next.js web application that displays live cryptocurrency prices using the CoinGecko API.

## Project Overview

The Crypto Price Tracker is a simple yet powerful tool that allows users to:

- View live prices of cryptocurrencies
- Search for specific cryptocurrencies
- Manually refresh price data
- See price changes over the last 24 hours

## Tech Stack

This project uses the following technologies:

- **Frontend**: Next.js 14 with App Router
- **State Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS with shadcn/ui components
- **API**: CoinGecko API for cryptocurrency data

## Project Setup Guide
- First we need to install node (which is of version v18.0 or higher) because it is compatible with the next version we are usinh
- Then we need to install the required packages by running the following command in the terminal: npm install
- After that run npm i
- Then run npm run dev to start the development server

## API Integration
- The Crypto Price Tracker fetches live cryptocurrency data using the CoinGecko API. The implementation leverages React Query for efficient data fetching, caching, and automatic updates.
- The response includes details such as name, symbol, price, market cap, volume, and price change percentage.
- useQuery is used to fetch and manage API data. The query key (["cryptoData"]) ensures that the data is cached and shared across components.
- Data is refreshed automatically every 60 seconds and when the browser is refocused.
- Users can manually refresh data with the refresh button
- Search functionality filters cryptocurrencies by name or symbol.
- Error handling ensures failed API requests display messages to the user


## State Management 
We chose React Query for state management because:
- It simplifies data fetching and caching.
- It provides automatic background refetching.
- It reduces unnecessary API calls by storing responses efficiently.
- It improves performance and user experience.

## Challenges and Solutions
- API Rate Limits<br>
Issue: The CoinGecko API has rate limits that restrict frequent requests.<br>
Solution: We implemented caching and interval-based fetching using React Query to minimize redundant requests.

- UI Performance Optimization<br>
Issue: Rendering large amounts of cryptocurrency data caused UI slowdowns.<br>
Solution: We used virtualized lists and lazy loading to improve rendering speed.

- Search Functionality Optimization<br>
Issue: Searching for cryptocurrencies caused frequent re-renders.<br>
Solution: We implemented debouncing to optimize search performance.





