const express = require("express");
const parser = require("body-parser");
const app = express();

// parses data with the content typ of the application JSON
app.use(parser.urlencoded({ extended:false }));

// middleware to serve static assets.
app.use(express.static('public'));

const posts = [
	{
		id: 1,
		author: 'John Doe',
		title: 'Templating with EJS',
		body: 'Blog post number 1',
	},
	{
		id: 2,
		author: 'Jane Doe',
		title: 'Express: How to make apps with Express',
		body: 'Blog post number 2',
	},
	{
		id: 3,
		author: 'PJ Valentini',
		title: 'How to code like a beginner',
		body: 'Blog post number 3',
	},
	{
		id: 4,
		author: 'Cody Johnson',
		title: 'Event Emitters',
		body: 'Blog post number 4',
	},
	{
		id: 5,
		author: 'Jen Jones',
		title: 'Bootstrap 101',
		body: 'Blog post number 5',
	},
	{
		id: 6,
		author: 'John Doe',
		title: 'Coding in Aviation',
		body: 'Blog post number 6',
	},
	{
		id: 7,
		author: 'PJ Valentini',
		title: 'CSS Tricks',
		body: 'Blog post number 7',
	},
	{
		id: 8,
		author: 'PJ Valentini',
		title: 'JavaScript for beginners',
		body: 'Blog post number 8',
	},
];

// Sets the view engine to ejs
app.set("view engine", "ejs");


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


// blog home page
app.get("/bloghome", (req, res) => {
	// Render bloghome.ejs with the list of posts
	res.render("bloghome", { posts: posts });
});

// blog post page
app.get("/blogpost/:id", (req, res) => {
	// Find the post in the posts array
		const post = posts.filter((post) => { // eslint-disable-line
			return post.id == req.params.id; // eslint-disable-line
		});
	// render the `post.ejs` template with the post content
	res.render("blogpost", {
		author: post[0].author,
		title: post[0].title,
		body: post[0].body,
	});
});


// This is a catch....
app.get('*', function(req, res) {
	res.status(404).send('Page not found!');
});

const server = app.listen(3000, () => {
	console.log('server started on port', server.address().port);
});
