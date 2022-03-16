const connectToMongo = require('./db');
const express = require('express')
let cors = require('cors')
const mongoose = require('mongoose');

// connectToMongo();
const app = express()
const port = process.env.PORT || 5000;

connectToMongo()


app.use(cors())
// app.use(express.json())
app.use(express.json({limit: "30mb",extended:true}));

// app.use(express.static("public"))



// Available Routes
app.use(require('./routes/auth'));
app.use("/api/authd", require('./routes/authd'));
app.use("/api/adminauth", require('./routes/adminauth'))
app.use(require('./routes/codes'))
// app.use("/api/img", require('./routes/images'))
app.use("/api/empuserformh", require('./routes/empuserformh'))
app.use("/api/empuserformd", require('./routes/empuserformd'))
app.use('/api/items', require('./routes/items'))


app.get("/", (req, res) => {
  res.json("Backend running...")
})

app.listen(port, () => {
  console.log(`Project Backend listening at http://localhost:${port}`)
})