const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/auth.middleware");
const {
    sendMessage,
    getMessage,
    deleteMessage
} = require("../controllers/contact.controller");

router.post("/", sendMessage);

router.get("/", protect, admin, getMessage);

router.delete("/:messageId", protect, admin, deleteMessage);


module.exports = router;


/*
! app.use("/api/contact", require("./routes/contact.routes"));

POST /register 
TODO : http://localhost:5000/api/contact

POST /login 
TODO: http://localhost:5000/api/contact
*/