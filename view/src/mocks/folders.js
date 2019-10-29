const clone = require("clone")

const db = {}

const defaultData = {
  folders: [
    {
      id: "d4y8vyss",
      name: "devops-docker-cf-cli",
      qty: 0,
      user: "Admin"
    },
    {
      id: "lvevg5qj",
      name: "openui5-website",
      qty: 10,
      user: "Admin"
    },
    {
      id: "3pfh3co1",
      name: "sgs-chfm-test-data",
      qty: 100,
      user: "Admin"
    },
    {
      id: "85i5qa6y",
      name: "icbs-apf",
      qty: 2,
      user: "Admin"
    },
    {
      id: "fa091la8",
      name: "test folder",
      qty: 10000,
      user: "Admin"
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

const add = (token, folder) => {
  if (!folder.id) {
    folder.id = Math.random()
      .toString(36)
      .substr(-8)
  }

  get(token).folders.push(folder)

  return folder
}

const remove = (token, id) => {
  const data = get(token)
  const folder = data.folders.find(f => f.id === id)

  if (folder) {
    data.folders = data.folders.filter(f => f !== folder)
  }

  return { folder }
}

module.exports = {
  get,
  add,
  remove
}
