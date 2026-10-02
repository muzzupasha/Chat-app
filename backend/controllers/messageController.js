import { Conversation } from "../model/conversationModel.js";
import { Message } from "../model/messageModel.js";
import mongoose from "mongoose";
import { getIO, getReceiverSocketId } from "../socket/socket.js";
export const sendMessage = async (req, res) => {
  try {
    const senderId = String(req.id).trim();
    const receiverId = String(req.params.id).trim();
    const { message } = req.body; // Assuming the message content is sent in the request body

    if (
      !mongoose.isObjectIdOrHexString(senderId) ||
      !mongoose.isObjectIdOrHexString(receiverId)
    ) {
      return res.status(400).json({ message: "Invalid user id" });
    } // Validate that both senderId and receiverId are valid MongoDB ObjectIds

    let gotConversation = await Conversation.findOne({
      // Check if a conversation already exists between the sender and receiver
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      // If no conversation exists, create a new one
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      // Create a new message document in the database with the sender ID, receiver ID, and message content
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id); // Add the new message ID to the messages array of the conversation
    }

    // Save the updated conversation and new messages simoltanously document to the database
    await Promise.all([gotConversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      getIO().to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json({
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    console.error("Error during sending message:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const receiverId = String(req.params.id).trim();
    const senderId = String(req.id).trim();

    if (
      !mongoose.isObjectIdOrHexString(senderId) ||
      !mongoose.isObjectIdOrHexString(receiverId)
    ) {
      return res.status(400).json({ message: "Invalid user id" }); // Validate that both senderId and receiverId are valid MongoDB ObjectIds
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages"); // Find the conversation between the sender and receiver and populate its messages

    if (!conversation) {
      return res.status(200).json({
        message: "No conversation found between the users",
        success: false,
        data: [],
      });
    }

    return res.status(200).json({
      message: "Messages fetched successfully",
      success: true,
      data: conversation?.messages,
    });
  } catch (error) {
    console.error("Error during fetching messages:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
