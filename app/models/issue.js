// Issues model
// insert enum for status...
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var enumStatus = {
  values : ['created_at', 'acknowledged_at', 'assigned_at', 'in_progress_at', 'solved_at', 'rejected_at'],
  message : 'Status enum validator failed for path `{PATH}` with value `{VALUE}`'
}
var IssueSchema = new Schema({

  authorname: 	{ type: String, required: true },
  description: 	{ type: String, required: true },
  img_url: 		  { type: String, required: true },
  tags:  		    [{ type: String, required: false }],
  email: 		    { type: String, required: false },
  telephone: 	  { type: Number, required: false },
  location: 	  { type: { type : String }, coordinates: [Number] },
  actions: [{
      timestamp: Date,
      status: { type: String, enum: enumStatus }
    }],
  assignedStaffId: { type: Schema.Types.ObjectId, ref: 'Staff' }, 
  typeId: { type: Schema.Types.ObjectId, ref: 'Type' }
});

mongoose.model('Issue', IssueSchema);

