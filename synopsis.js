// User Model
// ====================================

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['citizen', 'admin'], required: true },
  registrationDate: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;


// Complaint Model:
// ====================================

const mongoose = require('mongoose');

const complaintTypes = ['Noise', 'Road Maintenance', 'Waste Management', 'Public Safety', 'Infrastructure', 'Environmental', 'Building Code', 'Traffic'];

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['open', 'in progress', 'resolved', 'dismissed'], 
    default: 'open'
  },
  address: { type: String, required: true }, // You can change the type to match your needs
  complaintType: { 
    type: String, 
    enum: complaintTypes, // Use the complaintTypes enum for complaintType field
    required: true 
  },

  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  creationDate: { type: Date, default: Date.now },
  lastUpdatedDate: { type: Date, default: Date.now }
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;


// Suggestion/Petition Model:
// ====================================

const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  creationDate: { type: Date, default: Date.now },
  lastUpdatedDate: { type: Date, default: Date.now },
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

module.exports = Suggestion;


// Comment Model:
// ====================================

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  suggestion: { type: mongoose.Schema.Types.ObjectId, ref: 'Suggestion' },
  creationDate: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;


// Feedback Model:
// ====================================

// const mongoose = require('mongoose');

// const feedbackSchema = new mongoose.Schema({
//   rating: { type: Number, required: true },
//   comment: { type: String },
//   feedbackProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   suggestion: { type: mongoose.Schema.Types.ObjectId, ref: 'Suggestion' },
//   creationDate: { type: Date, default: Date.now }
// });

// const Feedback = mongoose.model('Feedback', feedbackSchema);

// module.exports = Feedback;


// Notification Model:
// ====================================

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  content: { type: String, required: true },
  type: { type: String, enum: ['email', 'in-app'], required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  creationDate: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;

