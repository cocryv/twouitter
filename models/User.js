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
    password: {
        type: String,
        required: [true, 'Please provide a password for this user.'],
      },
    bio: {
      type: String,
      default: null
    },
    location: {
      type: String,
      default: null
    },
    profilPicture: {
      type: String,
      default: null
    },
    banner: {
      type: String,
      default: null
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User",UserSchema);

