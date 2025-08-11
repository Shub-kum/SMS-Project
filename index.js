const express = require("express");
const dotenv = require("dotenv");
const twilio = require("twilio")
const app = express();

dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.set("view engine", "ejs");

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authTokin = process.env.TWILIO_AUTH_TOKEN
const client = new twilio(accountSid, authTokin)

app.post("/send-sms",async(req, res)=>{
    const {to, message} = req.body

    try{
        const result = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to
        })

        res.status(200).json({
            sid: result.sid,
            message: "SMS send Successfully."
        })
    }
    catch(error){
        res.status(500).json({
            message: "Failed to send SMS.",
            error: error.message
        })
    }
});

app.get("/",(req, res)=>{
    res.render("smspage.ejs");
});

app.listen(3000,()=>{
    console.log("Server runing on port 3000")
})