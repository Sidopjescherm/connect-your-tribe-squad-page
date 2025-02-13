// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Haal alle eerstejaars squads uit de WHOIS API op van dit jaar
const squadResponse = await fetch('https://fdnd.directus.app/items/squad?filter={"_and":[{"cohort":"2425"},{"tribe":{"name":"FDND Jaar 1"}}]}')

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
const squadResponseJSON = await squadResponse.json()

// Controleer de data in je console (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
// console.log(squadResponseJSON)


// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))

// Om Views weer te geven, heb je Routes nodig
// Maak een GET route voor de index
app.get('/', async function (request, response) {
  // Haal alle personen uit de WHOIS API op, van dit jaar
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?fields=*,squads.squad_id.name,squads.squad_id.cohort&filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"FDND Jaar 1"}}}},{"squads":{"squad_id":{"cohort":"2425"}}}]}')
  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()
  
  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Je zou dat hier kunnen filteren, sorteren, of zelfs aanpassen, voordat je het doorgeeft aan de view

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('index.liquid', {persons: personResponseJSON.data, squads: squadResponseJSON.data})
})

// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
app.post('/', async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van POST, redirect naar GET op /
  response.redirect(303, '/')
})

// Maak een GET route voor een detailpagina met een request parameter id
app.get('/detail/:id', async function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  const personDetailResponse = await fetch('https://fdnd.directus.app/items/person/' + request.params.id)
  // En haal daarvan de JSON op
  const personDetailResponseJSON = await personDetailResponse.json()
  
  // Render detail.liquid uit de views map en geef de opgehaalde data mee als variable, genaamd person
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('detail.liquid', {person: personDetailResponseJSON.data, squads: squadResponseJSON.data})
})

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})


// Eigen code

app.get('/detail/:id', async function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  const personDetailResponse = await fetch('https://fdnd.directus.app/items/person/' + request.params.id)
  // En haal daarvan de JSON op
  const personDetailResponseJSON = await personDetailResponse.json()
  
  // Render detail.liquid uit de views map en geef de opgehaalde data mee als variable, genaamd person
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('detail.liquid', {person: personDetailResponseJSON.data, squads: squadResponseJSON.data})
})


// Hier komt mijn eigen code

app.get('/squad_1h', async function (request, response){

})

// Team Blaze
app.get('/team_blaze', async function (request, response) {
  const teamblaze = await fetch ('https://fdnd.directus.app/items/person/?filter={%22team%22:%22Blaze%22}')
  const teamblazeJSON = await teamblaze.json()
  response.render('team_blaze.liquid', {persons: teamblazeJSON.data, squads: squadResponseJSON.data})
})

// Team Rocket
app.get('/team_rocket', async function (request, response) {
  const teamrocket = await fetch ('https://fdnd.directus.app/items/person/?filter={%22team%22:%22Rocket%22}')
  const teamrocketJSON = await teamrocket.json()
  response.render('team_rocket.liquid', {persons: teamrocketJSON.data, squads: squadResponseJSON.data})
})

// Team Flux
app.get('/team_Flux', async function (request, response) {
  const teamflux = await fetch ('https://fdnd.directus.app/items/person/?filter={%22team%22:%22Flux%22}')
  const teamfluxJSON = await teamflux.json()
  response.render('team_Flux.liquid', {persons: teamfluxJSON.data, squads: squadResponseJSON.data})
})

//Team Chill
app.get('/team_chill', async function (request, response) {
  const teamchill = await fetch ('https://fdnd.directus.app/items/person/?filter={%22team%22:%22Chill%22}')
  const teamchillJSON = await teamchill.json()
  response.render('team_chill.liquid', {persons: teamchillJSON.data, squads: squadResponseJSON.data})
})

//Team Hype
app.get('/team_hype', async function (request, response) {
  const team_hype = await fetch ('https://fdnd.directus.app/items/person/?filter={%22team%22:%22Hype%22}')
  const team_hypeJSON = await team_hype.json()
  response.render('team_hype.liquid', {persons: team_hypeJSON.data, squads: squadResponseJSON.data})
})

//Team Peak
app.get('/team_peak', async function (request, response) {
  const team_peak = await fetch ('https://fdnd.directus.app/items/person/?filter={%22team%22:%22Peak%22}')
  const team_peakJSON = await team_peak.json()
  response.render('team_peak.liquid', {persons: team_peakJSON.data, squads: squadResponseJSON.data})
})

//Team Zen
app.get('/team_zen', async function (request, response) {
  const team_zen = await fetch ('https://fdnd.directus.app/items/person/?filter={%22team%22:%22Zen%22}')
  const team_zenJSON = await team_zen.json()
  response.render('team_zen.liquid', {persons: team_zenJSON.data, squads: squadResponseJSON.data})
})

//Team Cool
app.get('/team_cool', async function (request, response) {
  const team_cool = await fetch ('https://fdnd.directus.app/items/person/?filter={%22team%22:%20%22Cool%22}')
  const team_coolJSON = await team_cool.json()
  response.render('team_cool.liquid', {persons: team_coolJSON.data, squads: squadResponseJSON.data})
})

//Team Rad
app.get('/team_rad', async function (request, response) {
  const team_rad = await fetch ('https://fdnd.directus.app/items/person/?filter={%22team%22:%20%22Rad%22}')
  const team_radJSON = await team_rad.json()
  response.render('team_rad.liquid', {persons: team_radJSON.data, squads: squadResponseJSON.data})
})

//Team Epic
app.get('/team_epic', async function (request, response) {
  const team_epic = await fetch ('https://fdnd.directus.app/items/person/?filter={%22team%22:%20%22Epic%22}')
  const team_epicJSON = await team_epic.json()
  response.render('team_epic.liquid', {persons: team_epicJSON.data, squads: squadResponseJSON.data})
})

//Team Awesome
app.get('/team_awesome', async function (request, response) {
  const team_awesome = await fetch ('https://fdnd.directus.app/items/person/?filter={%22team%22:%20%22Awesome%22}')
  const team_awesomeJSON = await team_awesome.json()
  response.render('team_awesome.liquid', {persons: team_awesomeJSON.data, squads: squadResponseJSON.data})
})

//Team Spirit
app.get('/team_spirit', async function (request, response) {
  const team_spirit = await fetch ('https://fdnd.directus.app/items/person/?filter={%22team%22:%20%22Spirit%22}')
  const team_spiritJSON = await team_spirit.json()
  response.render('team_spirit.liquid', {persons: team_spiritJSON.data, squads: squadResponseJSON.data})
})

//Team Storm
app.get('/team_storm', async function (request, response) {
  const team_storm = await fetch ('https://fdnd.directus.app/items/person/?filter={%22team%22:%20%22Storm%22}')
  const team_stormJSON = await team_storm.json()
  response.render('team_storm.liquid', {persons: team_stormJSON.data, squads: squadResponseJSON.data})
})
