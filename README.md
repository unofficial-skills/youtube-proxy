# YouTube Proxy

YouTube proxy API that search and stream videos/audios

## Usage

### Manual

- Node version: `12.6.0`
- Install dependencies: `npm install`
- Run: `npm start`

### Docker compose

- Create a container using docker-compose: `docker-compose up --no-start`
- Install dependencies: `docker-compose run app npm install`
- Start the project in background: `docker-compose up -d`
- Check logs of the services: `docker-compose logs -f`
- Stop the project: `docker-compose stop`
- If the project was stopped, start it with start: `docker-compose start`
- Exposed port: `3000`

#### Docker setup

Install docker: [https://docs.docker.com/engine/installation/](https://docs.docker.com/engine/installation/)

Install docker compose: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

Docker documentation: [https://docs.docker.com/](https://docs.docker.com/)

## Libraries included in the project

- express
- ytdl-core
- ytsr
