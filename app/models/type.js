// Type model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TypeSchema = new Schema({
  name: 	         { type: String, required: true },
  description: 		 { type: String, required: true }
});

mongoose.model('Type', TypeSchema);

