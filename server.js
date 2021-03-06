const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var databaseToUse = ""
if (process.env.NODE_ENV === "production") {
	app.use(express.static('client/build'));
	databaseToUse = "mongodb://tmf:Filipo21@ds111063.mlab.com:11063/heroku_gfwvqtk5";
}
else {
	databaseToUse = 'mongodb://localhost/test1';
}
app.use(routes);
const MONGODB_URI = process.env.MONGODB_URI || databaseToUse;
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI);
app.listen(PORT, function() {
	console.log(`App running on port ${PORT}`);
});
