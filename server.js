const express = require('express');
const hbs = require('hbs');
const request = require('request');
const fs = require('fs');
const port = process.env.PORT || 8080;

var app = express();
var url = '';
var num = Math.floor((Math.random() * 10) + 1);

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

hbs.registerHelper('getCurrentTime', () => {
	return new Date().toString();
})

//app.use("/", (request, response, next) => {
	/*let time = new Date().toString();
	let log = `${time}: ${request.method} ${request.url}`;
	fs.appendFile("server.log", log + "\n", (error) => {
	  if (error) {
		console.log("Unable to log message");
	  }
	});
	next();
  }, (request, response, next) => {*/
//	response.render("maintenance.hbs");
//  });

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

app.listen(port, () => {
	console.log(`Server is up on the port ${port}`);
	request({
        url: `https://jsonplaceholder.typicode.com/photos/${num}`,
        json: true
    }, (error, response) => {
		if (error) {
            callback('Cannot connect to Weather API')
        } else {
			console.log(response.body)
			url=response.body.url
		}    
    
    });
});

