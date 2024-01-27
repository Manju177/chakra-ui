const asyncHandler=require('express-async-handler');
const Chat=require('../models/chatModel');
const User = require('../models/userModel');

const accessChat = asyncHandler(async(req,res)=>{
    const {userId}=req.body;
    if(!userId){
        console.log("UserId param id is required")
        return res.sendStatus(400)

    }
    var isChat=await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:req.userId}}}
        ]
    }).populate("users","-password")
     .populate("latestMessage")

     isChat=await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email" 
     })
     if(isChat.length > 0){
        res.send(isChat[0]);
     }else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId]
        };
        try {
            const createChatData =await Chat.create(chatData);
            const FullChatData = await Chat.find({_id:createdChat._id}).populate("users","-password")
            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
     }
})

const fetchChats = asyncHandler(async(req, res)=>{
    try {
        Chat.find({users: {$elemMatch:{$eq:req.user._id}}}).then(result=>{res.send(result)})
        .populate('users','-password')
        .populate('groupAdmin','-password')
        .populate('latestMessage')
        .then(async(results)=>{
            results=await User.populate(results,{
                path:"latestMessage.sender",
                select:"name pic email"
            });
            res.status(200).send(results)
        })
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
        
    }
})

const createGroupChat=asyncHandler(async(req,res)=>{
        if(!req.body.users || !req.body.name){
            return res.status(400).send({message:"Please Fill the fileds"})
        }
        var users=JSON.parse(req.body.users);
        if(users.length<2){
            return res.status(400).status(400).send("More than twos user is required for group chat")
        }
        users.push(req.user);
        try {
            const groupChat = await Chat.create({
              chatName: req.body.name,
              users: users,
              isGroupChat: true,
              groupAdmin: req.user,
            });
        
            const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
              .populate("users", "-password")
              .populate("groupAdmin", "-password");
        
            res.status(200).json(fullGroupChat);
          } catch (error) {
            res.status(400);
            throw new Error(error.message);
          }
})

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;
  
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(updatedChat);
    }
  });

const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(added);
    }
  });
  
  
const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(removed);
    }
  });


module.exports ={accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup};