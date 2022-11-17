const Conversation = require('../models/Conversation')
const Message = require('../models/Message')

exports.createConversation = async(req,res) => {
    //Ensuring required fields are filled
    if(!req.body.users || !req.body.name){
        return res.status(400).send({ message: "Please complete all the fields" })
    }

    //getting the list of users within the conversation
    let convoUsers = JSON.parse(req.body.users)
    
    //ensuring proper number of users in a group chat
    if(convoUsers.length < 2){
        return res.status(400).send({ message: "Two or more people are required to create a group chat"})
    }

    //adding the user who sent the request into the list of users 
    convoUsers.push(req.user)

    //creating a new conversation using the conversation model 
    try {
        const newConversation = await Conversation.create({
            chatname: req.body.chatname,
            isgroupchat: true,
            users: convoUsers,
            grouphost: req.user
        })
        //looking for the conversation just created 
        const conversationGroupMembers = await Message.findOne({id: newConversation._id})
        .populate("users", "-password")
        .populate("grouphost", "-password")

        res.status(200).JSON(conversationGroupMembers)
    } catch (error) {
        console.error(error)
    }
    
    console.log(req)
    try {
        await Conversation.create({
            chatname: req.body.chatname,
            isgroupchat: req.body.isgroupchat,
            users: req.body.users,
            last

        })
        console.log('message created')
        res.send()
    } catch (error) {
        
    }
}

