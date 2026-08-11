<p align="center">
    <img src="assets/logo.png" width="250" alt="WindAhead logo">
</p>

<h1 align="center">WindAhead</h1>

<h3 align="center">A weather and wind analysis tool for your cycling and running routes.</h3>
<h4 align="center">Runs 100% in your browser. No uploads. No data stored.</h4>

---

![Example](assets/showcase.png)

## Supported GPX sources

Most GPX files exported from **Strava**, **Komoot**, **Garmin**, **Wahoo**, or similar apps work out of the box.
Track points, route points, waypoints, and elevation data are all supported.

## How it works

1. **Upload** a GPX file
2. **Pick** a date/time and average speed
3. WindAhead fetches hourly wind forecasts from the [Open-Meteo API](https://open-meteo.com) and calculates headwind, crosswind, and tailwind for every segment of your route

## Run it locally

### With Docker

Create a `docker-compose.yml`:

```yaml
services:
  windahead:
    image: ghcr.io/robiningelbrecht/wind-ahead:latest
    container_name: windahead
    restart: unless-stopped
    ports:
      - '8080:8080'
```

Then start it:

```bash
docker compose up -d
```

And open [http://localhost:8080](http://localhost:8080). Or without Compose:

```bash
docker run -d -p 8080:8080 --name windahead ghcr.io/robiningelbrecht/wind-ahead
```

## Related

[Dreeve](https://demo.dreeve.app) - A self-hosted, open-source dashboard for your sports and fitness data
