const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || 'dc1e2842236a92f2ba46a857e863583b';
const mapURI = process.env.MAP_ENDPOINT || "http://api.openweathermap.org/data/2.5";
const targetCity = process.env.TARGET_CITY || "Helsinki,fi";

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async () => {
//  const response = await fetch(`${mapURI}/weather?q=${targetCity}&appid=${appId}&`) 
  const response = await fetch(`${mapURI}/forecast?q=${targetCity}&appid=${appId}&`) // original

  return response ? response.json() : {}
};

router.get('/api/weather', async ctx => {
  const weatherData = await fetchWeather();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.list ? weatherData.list[0].weather[0] : {};
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);

// Forecast 
/*
const fetchForecast = async () => {
  const response = await fetch(`${mapURI}/forecast?q=${targetCity}&appid=${appId}&`)

  return response ? response.json() : {}
};

router.get('/api/forecast', async ctx => {
  const forecastData = await fetchForecast();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = forecastData.list ? forecastData.list[0].weather[0] : {};
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
*/


// Geolocation
/*
var posCurrent = navigator.geolocation.getCurrentPosition(function(position) {
  const lat = process.env.LAT || 'position.coords.latitude';
  const lon = process.env.LON || 'position.coords.longitude';

});

const fetchForecast = async () => {
  const response = await fetch(`${mapURI}/forecast?lat=${lat}&lon=${lon}&&appid=${appId}&`)

  return response ? response.json() : {}
};

router.get('/api/forecast', async ctx => {
  const forecastData = await fetchForecast();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = forecastData.list ? forecastData.list[0].weather[0] : {};
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
*/
