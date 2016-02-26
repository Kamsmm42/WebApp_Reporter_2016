// Type model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TypeSchema = new Schema({
  name: 	         { type: String, required: true },
  description: 		 { type: String, required: true }

});

/*a rajouter*/
// attention contrainte d'intégrité pour modifier type seulement par Staff
 
mongoose.model('Type', TypeSchema);

