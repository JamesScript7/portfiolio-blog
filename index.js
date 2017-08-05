const express = require("express");
const parser = require("body-parser");
const app = express();

// parses data with the content typ of the application JSON
app.use(parser.urlencoded({ extended:false }));
app.use(parser.json());

// middleware to serve static assets.
app.use(express.static('public'));

// Sets the view engine to ejs
app.set("view engine", "ejs");

const articlesController = require('./controllers/articles');

// Index page route setup
app.get("/", (req, res) => {
	// Render index.ejs page
	res.render("index");
});

// About Page route setup
app.get("/about", (req, res) => {
	// Render index.ejs page
	res.render("about");
});

// Contact Page route setup
app.get("/contact", (req, res) => {
	// Render index.ejs page
	res.render("contact");
});

app.get('/bloghome', articlesController.get);

/*
	You can get rid of this
	*	app.get("/bloghome", (req, res) => {
	*
	*		// Render bloghome.ejs with the list of posts
	*		res.render("bloghome");
	*	});
*/

// blog post page
app.get("/blogpost/:id", articlesController.show);


// This is a catch....
app.get('*', function(req, res) {
	res.status(404).send('Page not found!');
});

const server = app.listen(3000, () => {
	console.log('server started on port', server.address().port);
});
