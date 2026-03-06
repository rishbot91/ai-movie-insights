# CineInsight — AI Movie Insights

CineInsight is a web application that allows users to enter an **IMDb movie ID** and instantly view movie details along with **AI-generated audience sentiment insights**.

The application fetches movie metadata from the **OMDb API** and uses **Google Gemini AI** to analyze audience sentiment and generate insights such as sentiment classification, key themes, and audience appeal.

The goal of this project is to demonstrate **full-stack web development with AI integration**, focusing on clean architecture, modern UI, and maintainable code.

---

# Features

## Movie Information

The application retrieves and displays:

- Movie title
- Poster
- Cast list
- Release year
- Runtime
- IMDb rating
- Metascore
- Genres
- Director
- Language
- Awards
- Box office
- Plot summary

Data is fetched using the **OMDb API** based on the IMDb ID entered by the user.

---

## AI-Powered Sentiment Analysis

The application uses **Google Gemini (`gemini-3-flash-preview`)** to analyze the movie and generate audience sentiment insights.

The AI returns structured data including:

- **Overall sentiment classification**  
  *(Positive / Mixed / Negative / Neutral)*

- **Sentiment score (0–100)**

- **Short summary of audience reactions**

- **Key themes viewers discuss**

- **Audience appeal description**

These insights are displayed in a dedicated **Sentiment Analysis panel**.

---

## User Experience

The UI is designed to provide a clean and modern experience.

Key UI features include:

- Responsive layout for desktop and mobile
- Loading skeletons while data is fetched
- Input validation for IMDb IDs
- Error handling for invalid IDs or API failures
- Animated progress bar for sentiment score
- Example movie buttons for quick testing

---

## External APIs

**OMDb API**

Used to retrieve:

- Movie metadata
- Ratings
- Cast
- Poster
- Plot

---

# Setup Instructions

## 1. Clone the repository
```bash
git clone https://github.com/your-username/cineinsight.git
cd cineinsight
```
---

## 2. Install dependencies
```bash
npm install
```
---

## 3. Create environment variables

Create a file:
```bash
.env.local
```

Add the following keys:
```bash
OMDB_API_KEY=your_omdb_api_key
GEMINI_API_KEY=your_gemini_api_key
```
---

## 4. Run the development server
```bash
npm run dev
```
Open in browser:
```bash
http://localhost:3000
```

# Future Improvements

Potential enhancements include:

- Retrieving real audience reviews from external APIs
- Displaying sample audience reviews in the UI
- Caching AI responses to reduce API calls
- Adding unit tests for validation and API routes
- Improving AI prompts for more detailed insights
- Adding search by movie title in addition to IMDb ID

