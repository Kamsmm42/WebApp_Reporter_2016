// Comments model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CommentSchema = new Schema({
  authorname: 		{ type: String, required: true },
  text: 			{ type: String, required: true },
  date: 			{ type: Date, required: true },
  email: 			{ type: String, required: false },
  telephone: 		{ type: Number, required: false },
  // comment faire contrainte qu'au moins email ou telephone doit etre rempli? 
  issue: [{ type: Schema.Types.ObjectId, ref: 'Issue' }] // comment préciser un seul id ici?
});

/*a rajouter*/


mongoose.model('Comment', CommentSchema);

