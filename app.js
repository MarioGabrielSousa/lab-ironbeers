const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

app.get('/', (req, res) => {
  res.render('index');

});

app.get('/beers', (req, res) => {
  punkAPI.getBeers().then((response) => {//a formula é sempre esta método, then(response), console.log(response), res.render, catch, console error
    console.log(response);
    res.render('beers', { beers: response}); //como já disse qual é o engine que estou a usar (hbs), basta só o nome do ficheiro e não a extensão
  }).catch(() => {
    console.log('error');
  })
});

app.get('/random-beers', (req, res) => {
  punkAPI.getRandom().then((response) => {//a formula é sempre esta método, then(response), console.log(response), res.render, catch, console error
    console.log(response);
    res.render('random-beers', { beer: response[0]});
    //aqui uso esta formula porque response é um array e, ao iterar sobre ele atrás do método getRandom, estou a garantir que me dê só um resultado.
    //também poderia escrever aqui só {beers: response} e no ficheiro random-beers usar o método {{#each beers}} name: {{name}} {{/each}},
    //mas é mais usado para quando estamos a invocar mais do que um elemento
  }).catch(() => {
    console.log('error');
  })
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
