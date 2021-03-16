const express = require("express");
const mongoose = require("mongoose");
const messages = require("./dbMessages");
const Pusher = require("pusher");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1145849",
  key: "0b3660f9eb0104fd6239",
  secret: "02a04b2d694d2ae2ebf6",
  cluster: "eu",
  useTLS: true,
});

app.use(express.json());
app.use(cors());

const connectionUrl =
  "mongodb+srv://admin:oBB1Sv0n0HQQmyMi@cluster0.1oqfz.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(connectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("A change occurred", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;

      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.get("/messages/sync", (req, res) => {
  messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
