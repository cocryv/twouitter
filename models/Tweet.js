import mongoose from 'mongoose';

const TweetSchema = new mongoose.Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: [true, 'Please provide an user for this tweet.'],
    },
    body: {
        type: String,
        required: [true, 'Please provide a body for this tweet.'],
    },
    date: 
        { 
            type: Date,
            default: Date.now
        },
    replyTo :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tweet',
    },
    comments: [
        { 
            user :{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required: [true, 'Please provide an user for this comment.'],
            },
            body: {
                type: String,
                required: [true, 'Please provide a body for this tweet.'],
              },
            date: Date 
        }
    ],
    favs:[
        { 
            user :{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
            }
        },
    ],
    retweets:[
        { 
            user :{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
            }
        },
    ],
});

export default mongoose.models.Tweet || mongoose.model("Tweet",TweetSchema);

