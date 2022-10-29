const Message = require('../models/Message');


exports.createMessage = async (req, res) => {
    // want to insert the message into the message collection
    console.log(req.body)
    try {
        await Message.Create({
            createdBy: req.user._id,
            message: req.body.message, 
            conversationReference: 100
        })
        console.log("Message created")
        return res.status(200)
    } catch (error) {
        return res.status(500)
    }

}