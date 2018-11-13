const express = require('express');
const hbs = require('hbs');
const request = require('request');
const fs = require('fs')

var app = express();
var url = '';

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
	return new Date().getDate();
})


hbs.registerHelper('message', (text) => {
	return text.toUpperCase();
})

/*app.use('/', (req, res, next) => {
	try {
		res.render('index.hbs',  {
			title: 'Index page',
			year: new Date().getFullYear(),
			date: new Date().getDate(),
			welcome: 'welcome to index page!'
		})
	}
	catch(error) {
		res.render('maintenance.hbs')
	}
	next();
})*/

app.use((resquest, response, next) => {
	var time = new Date().toString();
	//console.log(`${time}: ${request.method} ${request.url}`);
	var log = `${time}: ${request.method} ${request.url}`;
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log('Unable to log message');
		}
	})
	next();
})

app.get('/', (request, response) => {
	// response.send('<h1>Hello Express!</h1>');
	response.render('index.hbs', {
		title: 'Index page',
		year: new Date().getFullYear(),
		date: new Date().getDate(),
		welcome: 'welcome to index page!'
	})
});

app.get('/info', (request, response) => {
	response.render('about.hbs', {
		title: 'About page',
		year: new Date().getFullYear(),
		date: new Date().getDate(),
		welcome: 'welcome to about page!'
	});
});

app.get('/img', (request, response) => {
	response.render('img.hbs', {
		title: 'Img page',
		year: new Date().getFullYear(),
		date: new Date().getDate(),
		welcome: 'welcome to img page!',
		address:url
	
	})
})
app.get('/404', (request, response) => {
	response.send({
		error: 'Page not found'
	})
})

app.get('/maintenance', (req, res) => {
	res.render('maintenance.hbs')
})

app.listen(8080, () => {
	console.log('Server is up on the port 8080');
	request({
        url: 'https://jsonplaceholder.typicode.com/photos/1',
        json: true
    }, (error, response, body) => {
        
            url=body.url
            
    
    });
});

