const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const folders = require("./folders")
const repos = require("./repos")
const discoveries = require("./discoveries")
const scans = require("./scans")
const rules = require("./rules")

const app = express()
const port = 5001

app.use(express.static("../../public"))
app.use(cors())

app.use((req, res, next) => {
  const token = req.get("Authorization")

  if (token) {
    req.token = token
    next()
  } else {
    res.status(403).send({
      error:
        "Please provide an Authorization header to identify yourself (can be whatever you want)"
    })
  }
})

// -------------------------------------
// FOLDERS ROUTES
app.get("/folders", (req, res) => {
  res.send(folders.get(req.token))
})

app.delete("/folders/:id", (req, res) => {
  res.send(folders.remove(req.token, req.params.id))
})

app.post("/folders", bodyParser.json(), (req, res) => {
  const { name } = req.body
  if (name) {
    res.send(folders.add(req.token, req.body))
  } else {
    res.status(403).send({
      error: "Please provide a name for the folder"
    })
  }
})

// -------------------------------------
// REPOS ROUTES
app.get("/repos", (req, res) => {
  res.send(repos.get(req.token))
})

app.get("/repos/:id", (req, res) => {
  res.send(repos.getOne(req.token, req.params.id))
})

app.delete("/repos/:id", (req, res) => {
  res.send(repos.remove(req.token, req.params.id))
})

app.post("/repos", bodyParser.json(), (req, res) => {
  const { name } = req.body
  if (name) {
    res.send(repos.add(req.token, req.body))
  } else {
    res.status(403).send({
      error: "Please provide a name for the repository"
    })
  }
})

// -------------------------------------
// DISCOVERIES ROUTES
app.get("/discoveries/:id", (req, res) => {
  res.send(discoveries.get(req.token))
})

// -------------------------------------
// DISCOVERIES ROUTES
app.get("/scans/:id", (req, res) => {
  res.send(scans.get(req.token))
})

// -------------------------------------
// RULES ROUTES
app.get("/rules", (req, res) => {
  res.send(rules.get(req.token))
})

app.delete("/rules/:id", (req, res) => {
  res.send(rules.remove(req.token, req.params.id))
})

app.post("/rules", bodyParser.json(), (req, res) => {
  const { name } = req.body
  if (name) {
    res.send(rules.add(req.token, req.body))
  } else {
    res.status(403).send({
      error: "Please provide a name for the rule"
    })
  }
})

// -------------------------------------
// Start server
app.listen(port, () => {
  console.log("Mock server started on port %s", port)
})
