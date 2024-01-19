// Import the Mongoose library
// ------------------------------------------------
const mongoose = require('mongoose');

const CommentsSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    userName:{
        type: String,
        required:true
    },
    comment:{
        type:String,
        required: true,
        maxlength:130,
    },
    rate:{
        type: Number,
        required: true,
        min: 1,
        max:5
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
})

// Export the Comment model
// ------------------------------------------------
module.exports = mongoose.model('Comment', CommentsSchema);
 