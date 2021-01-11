<!-- GETTING STARTED WEBAPP -->
## Getting Started With Web App

To get up and running with the server and the client install the prerequisites and read the installation Readme.

### Prerequisites Web App

This requires NPM to be installed.
* npm
  ```sh
  npm install npm@latest -g
  ```
* MongoDB instance (cloud or local).
  ```sh
  Put the connection string into DATABASE_URL inside of servers .env
  ```
* MapBox Account (to get token).
  ```sh
  Put the mapbox token into DATABASE_URL inside of clients .env
  ```

### Installation Web App

1. Clone the repo if already not done so.
   ```sh
   git clone https://github.com/backbonzo/SchoolProjectV2.git
   ```
2. CD to the right directory (either client or server depends on what you want to run)
   ```sh
   cd prototype/web-app/client
   or
   cd prototype/web-app/server
   ```
   
3. Install NPM packages
   ```sh
   npm install
   ```
   
5. Change ENV variables for server
   ```sh
   NODE_ENV=development
   PORT=PORT NUMBER
   DATABASE_URL=MONGODB CONNECTION URL
   CORS_ORIGIN=http://localhost:port
   ```
   
6. Run in development mode
   ```sh
   npm run dev
   ```
   This requires nodemon to be installed.
   
7. Change ENV variables for the client
   ```sh
   REACT_APP_MAPBOX_TOKEN=MAPBOX_TOKEN_KEY
   ```

8. Run the client
   ```sh
   npm run start
   ```

 ## Congrats, you're done! :sprakles: