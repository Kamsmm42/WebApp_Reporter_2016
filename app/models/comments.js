// Comments model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CommentsSchema = new Schema({
  authorname: 		{ type: String, required: true },
  text: 			{ type: String, required: true },
  date: 			{ type: Date, required: true },
  email: 			{ type: String, required: false },
  telephone: 		{ type: Number, required: false }

});

/*a rajouter*/


mongoose.model('Comments', CommentsSchema);

