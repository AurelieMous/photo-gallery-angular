# Prisme

A modern photo and video gallery built with **Angular 21** and **Tailwind CSS 4**, powered by the Pexels API.

Afficher l'imageAfficher l'imageAfficher l'image

## Features

* 📷 Browse and search high-quality photos
* 🎥 Discover videos with hover-to-play preview
* 📚 Explore curated collections
* 🔍 Real-time search with pagination
* 📱 Fully responsive design
* ⚡ Built with Angular signals and standalone components

## Quick Start

### Prerequisites

* Node.js 18+
* [Pexels API Key](https://www.pexels.com/api/) (free)

### Installation

bash

```bash
# Clone repository
git clone https://github.com/your-username/pexels-gallery.git
cd pexels-gallery

# Install dependencies
npm install

# Add your API key in src/app/services/pexels.service.ts
# private apiKey = 'YOUR_PEXELS_API_KEY';

# Start dev server
npm start
```

Open `http://localhost:4200`

## Project Structure

```
src/app/
├── home/              # Photo gallery (main page)
├── photos/            # Photo details
├── videos/            # Video gallery & details
├── collections/       # Collections browser
├── shared/            # Reusable components (pagination, search, error)
├── services/          # Pexels API integration
├── models/            # TypeScript interfaces
└── helpers/           # Utility functions
```

## Pages


| Route             | Description                         |
| ----------------- | ----------------------------------- |
| `/`               | Home - Photo gallery with search    |
| `/photo/:id`      | Photo detail with download options  |
| `/videos`         | Video gallery with hover preview    |
| `/videos/:id`     | Video player with download options  |
| `/collections`    | Featured collections                |
| `/collection/:id` | Collection detail (photos + videos) |

## Tech Stack

* **Angular 21.1** - Framework with signals
* **TypeScript 5.9** - Type safety
* **RxJS 7.8** - Reactive programming
* **Tailwind CSS 4.1** - Styling
* **Vitest 4.0** - Testing
* **Pexels API** - Media content

## API Usage

**Rate Limit:** 200 requests/hour (free tier)

**Endpoints:**

* Photos: `/v1/curated`, `/v1/search`, `/v1/photos/:id`
* Videos: `/v1/videos/popular`, `/v1/videos/search`, `/v1/videos/videos/:id`
* Collections: `/v1/collections/featured`, `/v1/collections/:id`

## Build & Development

bash

```bash
# Development server
npm start

# Production build
npm run build

# Run tests
npm test

# Watch mode
npm run watch
```

## Key Features

### Photo Gallery

* Grid layout with responsive columns (1-4 based on screen size)
* Search functionality with URL query parameters
* Pagination with 80 photos per page
* Download options in multiple resolutions

### Video Gallery

* Hover-to-play video preview
* Smooth opacity transitions
* Muted autoplay for better UX
* Download in HD, SD, and mobile quality

### Collections

* Browse featured Pexels collections
* View mixed media (photos + videos)
* Collection statistics and metadata
* Navigate through collection pages

🙏 Credits

## Credits

* [Pexels](https://www.pexels.com/) - Free photo & video API
* [Angular](https://angular.io/) - Web framework
* [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

**Made with ❤️ and Angular 21**
