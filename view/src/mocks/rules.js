const clone = require("clone")

const db = {}

const defaultData = {
  rules: [
    {
      id: 1,
      name: "public_c_cred.yml",
      lastUpdated: "2019-08-23 18:16",
      user: "Admin",
      usings: 4,
      description: "Pellentesque metus lacus commodo eget justo"
    },
    {
      id: 2,
      name: "public_ws2.yml",
      lastUpdated: "2019-08-23 18:16",
      user: "Admin",
      usings: 3,
      description: "Pellentesque metus lacus commodo eget justo"
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

const add = (token, rule) => {
  if (!rule.id) {
    rule.id = Math.random()
      .toString(36)
      .substr(-8)
  }

  get(token).rules.push(rule)

  return rule
}

const remove = (token, id) => {
  const data = get(token)
  const rule = data.rules.find(r => r.id === id)

  if (rule) {
    data.rules = data.rules.filter(r => r !== rule)
  }

  return { rule }
}

module.exports = {
  get,
  add,
  remove
}
