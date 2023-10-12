## Setup

After cloning the repository `cd` into the `ecde-openlayers` folder.

## Backend API

To install the python related dependencies run:

```bash
pip install -e .
pip install -r requirements.txt
```

To launch the API server, run:

```bash
# Development mode
uvicorn src.app.server:app --port 5000 --reload
# Production mode, with configured base path, in case behind a proxy
uvicorn src.app.server:app --port=5000 --root-path=/apps/ecde-prototype-1/api
```

## Front-end application

To install the front end related dependencies:

```bash
npm install
```

### Using webapp

To launch the app (in development mode).

```bash
npm start
```

This will configure the app to look for the API backend on `http://localhost:5000`.

If you want to generate the static pages in the `dist` folder:

```bash
npm run build
```

This will build a static version of the app in the dist folder, looking for API backend the backend `/api`.

In both cases, you can configure the API base URL using environment variables, for example:

```bash
# Controlling the backend API while running the weapp in development mode
VITE_API_BASE='http://localhost:8000' npm run
# Controlling the backend API in production mode. Remember this value is read AT BULD TIME
VITE_API_BASE='http://www.mycompany.org/api/' npm run build
```
