// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express, { response } from 'express'

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

//Squad 1G
app.get('/squad_1_g', async function (request, response) {
  const squad_1_g = await fetch ('https://fdnd.directus.app/items/person/?sort=squads&filter[squads][_between]=74,97')
  const squad_1_gJSON = await squad_1_g.json()
  response.render('squad_1_g.liquid', {persons: squad_1_gJSON.data, squads: squadResponseJSON.data})
})

//Squad 1H
app.get('/squad_1_h', async function (request, response) {
  const squad_1_h = await fetch ('https://fdnd.directus.app/items/person/?sort=squads&filter[squads][_between]=74,97')
  const squad_1_gJSON = await squad_1_g.json()
  response.render('squad_1_g.liquid', {persons: squad_1_gJSON.data, squads: squadResponseJSON.data})
})

// Alle team pagina's
app.get('/teams/:team', async function (request, response) {
  console.log(request.params.team)

  // TODO voor Sid: zorgen dat je request.params.team kunt gebruiken in de volgende URL
  const teamResponse = await fetch ('https://fdnd.directus.app/items/person/?filter={"team":{"_contains":"' + request.params.team + '"}}')
  const teamResponseJSON = await teamResponse.json()

  console.log(teamResponseJSON)

  // Als de data 'leeg', laat dan een andere pagina zien...
  if (teamResponseJSON.data.length == 0) {

  } else 
    // TODO voor Sid: deze liquid file hernoemen (Naming Things)
    response.render('teamleden.liquid', {persons: teamResponseJSON.data, squads: squadResponseJSON.data, team_name: request.params.team})
})

//Hier komen de berichten

let messages = []

app.get('/berichten', async function (request, response) {
  response.render('berichten.liquid', {messages: messages})
})

app.post('/berichten', async function (request, response) {

  messages.push(request.body.tekst)
  
  response.redirect(303, '/berichten')
})
