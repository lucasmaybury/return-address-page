## Running in Dev mode
In root, run `npm run dev` to start node server, runs on port 8081

In `webapp/`, run `npm run dev`, runs on port 8080

## Building for prod
To start the whoIn root, run `npm run start`. This comamnd builds the webapp to `public/`, and starts the server.

To build the webapp only, in `webapp/`, run `npm run build`

`generate-google-api-credentials.js` generates a file containing secrets from environment variables, for the Google API Client to work

## Environment variables
stub for server `.env` file: 
```
GOOGLE_CLIENT_EMAIL =
GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_X509_CERT_URL =
GOOGLE_PRIVATE_KEY =
GOOGLE_PRIVATE_KEY_ID =
GOOGLE_CONFIG_SHEET_NAME = 
GOOGLE_SHEET_ID = 
```

stub for webapp `.env` file: 
```
VITE_API_URL = 
VITE_RETURN_ADDRESS_ENDPOINT = 
```