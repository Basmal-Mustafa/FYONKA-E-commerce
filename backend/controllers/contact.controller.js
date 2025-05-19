const Contact = require("../models/contact.model");

const sendMessage = async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, Email and Message are Required" });
    }
    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(200).json({ message: "Message Sent Successfully" });
    } catch (error) {
        console.log("Error: Message not Saving");
        res.status(500).json({ message: error.message });
    }
};

const getMessage = async (req,res)=>{
    try{
        const message = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ message });
    }catch(error){
        console.log("Error Finding Message");
        res.status(400).json({ message: error.message });
    };
};

const deleteMessage = async (req, res) => {
    const { messageId } = req.params;
    try {
        const deletedMessage = await Contact.findByIdAndDelete(messageId);
        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        console.log("Error deleting message:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    sendMessage,
    getMessage,
    deleteMessage
};