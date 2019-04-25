require("dotenv").config()
const express = require("express")
const massive = require("massive")
const session = require("express-session")
const authCtrl = require("./controllers/authController")
const treasCtrl = require("./controllers/treasureController")

const app = express()
const port = 4000

const { CONNECTION_STRING, SESSION_SECRET } = process.env

massive(CONNECTION_STRING).then(db => {
  app.set("db", db)
  console.log("db is connected")
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
})

// --Middleware-- //
app.use(express.json())

app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}))

// --Endpoints-- //
// Auth
app.post("/auth/register", authCtrl.register)
app.post("/auth/login", authCtrl.login)
app.get("/auth/logout", authCtrl.logout)

// Treasure
app.get("/api/treasure/dragon", treasCtrl.dragonTreasure)

