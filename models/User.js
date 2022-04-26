import mongoose from 'mongoose';
require('mongoose-type-email');

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide a name for this user.'],
    },
    username: {
        type: String,
        required: [true, 'Please provide a username for this user.'],
      },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: [true, 'Please provide an email for this user.'],
      },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User",UserSchema);

