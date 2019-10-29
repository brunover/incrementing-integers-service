const clone = require("clone")

const db = {}

const defaultData = {
  repos: [
    {
      id: 1,
      name: "devops-docker-cf-cli.git",
      firstScan: "2019-08-23",
      lastScan: "2019-08-23",
      discoveriesQty: 8
    },
    {
      id: 2,
      name: "sgs-chfm-testdata.git",
      firstScan: "2019-08-23",
      lastScan: "2019-08-23",
      discoveriesQty: 34
    },
    {
      id: 3,
      name: "openui5-website.git",
      firstScan: "2019-08-23",
      lastScan: "2019-08-23",
      discoveriesQty: 403
    }
  ]
}

const get = token => {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  return data
}

const getOne = (token, id) => {
  if (!id) {
    return null
  }

  try {
    id = parseInt(id)
  } catch (e) {
    console.error(e)
    return null
  }

  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  const repo = data.repos.find(r => r.id === id)

  return repo
}

const add = (token, repo) => {
  if (!repo.id) {
    repo.id = Math.random()
      .toString(36)
      .substr(-8)
  }

  get(token).repos.push(repo)

  return repo
}

const remove = (token, id) => {
  const data = get(token)
  const repo = data.repos.find(r => r.id === id)

  if (repo) {
    data.repos = data.repos.filter(r => r !== repo)
  }

  return { repo }
}

module.exports = {
  get,
  getOne,
  add,
  remove
}
