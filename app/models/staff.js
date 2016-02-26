// Staff model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var StaffSchema = new Schema({
  name: 		{ type: String, required: true },
  login: 		{ type: String, required: true },
  password: 	{ type: String, required: true },
  email: 		{ type: String, required: true },
  telephone: 	{ type: String, required: true },
  city: 		{ type: String, required: true },
  //token: 		{ type: String } // demande à Simon comment utiliser Token Remember me
  assignedIssues: [{ type: Schema.Types.ObjectId, ref: 'Issues' }]
});

/*a rajouter*/
// attention contrainte d'intégrité pour modifier type 
// attention contrainte d'intégrité pour assigner Issues
 

mongoose.model('Staff', StaffSchema);

