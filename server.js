const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const path = require('path')

app.use(express.json());

connectDB();


app.use("/api/users", require('./routes/userRoute'));
app.use("/api/cards", require('./routes/cardRoute'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, (err) =>
  err ? console.log("error") : console.log(`server is running on port ${port}`)
);

