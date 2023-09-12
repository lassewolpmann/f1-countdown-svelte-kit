# f1-countdown.com

Source code for f1-countdown.com, a website created for F1 Fans to keep track of the schedule and never miss a race again.  

# Running Locally

## Developing
```bash
# clone project
git clone https://github.com/lassewolpmann/f1-countdown-svelte-kit.git
cd f1-countdown-svelte-kit/

# install dependencies
npm install (or pnpm install` or yarn`)

# Create .env file for OpenWeatherMap API
PUBLIC_OPEN_WEATHER_API_KEY=your API key

# start development server
npm run dev
```

## Building
To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Running with Docker
```bash
docker compose up
```

or

```bash
docker compose up -d
```

to run in the background.  
You can then access the running container on http://localhost:3000  
Note: The Docker image doesn't use local changes. It always pulls the latest version from GitHub.
