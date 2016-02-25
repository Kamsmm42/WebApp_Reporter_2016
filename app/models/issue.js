// Issues model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var IssueSchema = new Schema({
  authorname: 	{ type: String, required: true },
  date: 		{ type: Date, required: true },
  description: 	{ type: String, required: true },
  img_url: 		{ type: String, required: true },
  tags:  		{ type: String, required: false },
  email: 		{ type: String, required: false },
  telephone: 	{ type: Number, required: false },
  coord_long: 	{ type: String, required: true },
  coord_lat: 	{ type: String, required: true }, 

  // status


});


mongoose.model('Issue', IssueSchema);

