const Conversation = require('../models/Conversation')

exports.createConversation = async(req,res) => {
    console.log(req)
    try {
        await Conversation.create({

        })
        console.log('message created')
        res.send()
    } catch (error) {
        
    }
}

