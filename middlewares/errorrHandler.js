//this middleware get errors from the entire app and handles them.

const errorHandler = (error, req, res, next)=>{
    const status = error.statusCode || 500;//*get status code from error or return 500
    const message = error.message;//* get message of error
    const data = error.data;//* get othar data from error
    res.status(status).json({message, data})//* send status that gote from error as status and send message and data as json to user
}

//exports errorHandler
module.exports = errorHandler;