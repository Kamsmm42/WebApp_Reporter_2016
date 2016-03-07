// Comments model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CommentSchema = new Schema({
  authorname: 		{ type: String, required: true },
  text: 			{ type: String, required: true },
  date: 			{ type: Date, required: true },
  email: 			{ type: String, required: false },
  telephone: 		{ type: Number, required: false },
  issueId: { type: Schema.Types.ObjectId, ref: 'Issue', required: true}
});


mongoose.model('Comment', CommentSchema);

