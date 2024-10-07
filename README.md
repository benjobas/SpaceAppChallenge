# Exoplanetary - Habitable Range Exoplanet Star Map

Exoplanetary is an interactive web application that utilizes NASA's open exoplanet API to display confirmed exoplanets within the observable universe that lie in the habitable zone of their parent stars. The application renders exoplanets on a virtual "night sky" based on their declination and right ascension coordinates. Each planet is interactive, providing details about the exoplanet, and includes an elliptical orbit map to show its relative speed around the parent star.

## Features

- **Interactive Planet Map**: Displays exoplanets in the night sky based on NASA's API data.
- **Habitable Zone Filter**: Filters out planets that are not within the habitable range of their stars.
- **Planet Details**: Click on a planet to view more information about its size, distance, and other characteristics.
- **Orbital Visualization**: Shows the elliptical orbit and speed of exoplanets around their stars.

## Prerequisites

- Node.js (v14+)
- MongoDB database (local or cloud)
- NASA Exoplanet API Key
- OpenAI API Key (for ChatGPT functionality if used)

## Setup

### Clone the Repository

```bash
git clone https://github.com/benjobas/SpaceAppChallenge/tree/master
```

### Install Dependencies

```bash
npm install
```

### Start app

```bash
npm run start
```

### Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```bash
# MongoDB connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority

# NASA Exoplanet API (optional if needed)
NASA_API_KEY=your-nasa-api-key

# OpenAI API for ChatGPT
OPENAI_API_KEY=your-openai-api-key
```

- **`MONGODB_URI`**: Your MongoDB connection string. Replace `<username>`, `<password>`, and `<dbname>` with your MongoDB credentials.
- **`NASA_API_KEY`**: Your API key for NASA's exoplanet data. You can get this from the [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/docs/program_interfaces.html).
- **`OPENAI_API_KEY`**: Your API key from OpenAI for enabling ChatGPT functionality. You can sign up for a key [here](https://beta.openai.com/signup/).

### Run the Application

```bash
npm run dev
```

## Features

### Interactive Night Sky

The planets are rendered based on their coordinates in the observable universe using declination and right ascension values. The view can be interacted with, and the details of any planet can be shown on hover or click.

### Orbit Visualization

The elliptical orbit of each planet is displayed with real-time speed based on its orbital period, allowing users to visualize how each exoplanet moves around its parent star.

### API Integration

- **NASA API**: Fetches the latest data on exoplanets in the habitable range.
- **MongoDB**: Stores user data, preferences, or any other relevant information.
- **ChatGPT (Optional)**: Provides additional AI-driven insights on the selected exoplanets.

## Contributing

Feel free to submit issues, pull requests, or suggestions to improve this project.
