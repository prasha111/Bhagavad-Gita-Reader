# Bhagavad Gita Reader

A modern web application for reading the Bhagavad Gita chapter by chapter and verse by verse through a clean, responsive interface.

**Live Demo:** [https://bhagavad-gita-reader-abgv.vercel.app/](https://bhagavad-gita-reader-abgv.vercel.app/)

## Overview

Bhagavad Gita Reader is designed to provide a simple digital reading experience for the Bhagavad Gita. The app structure suggests direct verse access through dynamic URLs, making chapter-wise and verse-wise reading easy to navigate.

## Features

- Chapter-wise and verse-wise reading
- Direct access to verses using dynamic routes
- Clean and responsive UI
- Mobile-friendly reading experience
- Shareable verse links

## Reader Route

The app uses a verse-based route structure:

```bash
/reader/[chapter]/[verse]
```

Example:

```bash
/reader/1/1
```

This route opens Chapter 1, Verse 1 directly.

## Tech Stack

Likely stack based on deployment pattern:

- Next.js
- React
- JavaScript or TypeScript
- Vercel

## Getting Started

Clone the repository:

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open in browser:

```bash
http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## Project Structure

Example structure:

```bash
.
├── app / pages
├── components
├── public
├── styles
├── utils
└── package.json
```

## Deployment

The application is deployed on Vercel:

[https://bhagavad-gita-reader-abgv.vercel.app/](https://bhagavad-gita-reader-abgv.vercel.app/)

## Future Improvements

- Search by verse or chapter
- Multiple translations
- Dark mode
- Audio recitation
- Bookmarks and favorites
- Notes and highlights

## License

MIT License

## Author

Prashant Sharma
