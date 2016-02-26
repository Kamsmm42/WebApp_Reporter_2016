// Issues model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var IssueSchema = new Schema({

  authorname: 	{ type: String, required: true },
  date: 		    { type: Date, required: true },
  description: 	{ type: String, required: true },
  img_url: 		  { type: String, required: true },
  tags:  		     [{ type: String, required: false }],
  email: 		     { type: String, required: false },
  telephone: 	  { type: Number, required: false },
  location: 	  { type: { type : String }, coordinates: [Number] },
  //actions: [{ 
  //    timestamp: Date,
  //    status: String
  //  }], // demande à Simon pourquoi ca ne fonctionne pas
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  assignedStaff: [{ type: Schema.Types.ObjectId, ref: 'Staff' }], // comment préciser que ce n'est qu'un id ici?
  categorisedType: [{ type: Schema.Types.ObjectId, ref: 'Type' }] // comment préciser que ce n'est qu'un id ici?

});


mongoose.model('Issue', IssueSchema);

