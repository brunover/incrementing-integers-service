const clone = require("clone")

const db = {}

const defaultData = {
  scans: [
    {
      id: "75",
      rid: "4",
      started: "2019-09-06T18:33:37.208821Z",
      completed: "2019-09-06T00:33:00Z",
      rulesUsed: [
        "80dde9191eb55d78f8c99ace68aec1cee8d7ba64\n",
        "b9224e95d02ff7189a16993fd02d1a85af24ce43\n"
      ],
      flaggedCommits: [
        "57f03c1fbdb46483e8be0dd6ed43fe0e8196fd68",
        "7ea9aaa684cd7e6947db2741227b58f348376b16"
      ],
      flaggedCategories: ["auth/username"],
      totalDiscoveries: 417
    },
    {
      id: "76",
      rid: "4",
      started: "2019-09-06T19:33:37.208821Z",
      completed: "2019-09-06T00:33:00Z",
      rulesUsed: [
        "80dde9191eb55d78f8c99ace68aec1cee8d7ba64\n",
        "b9224e95d02ff7189a16993fd02d1a85af24ce43\n"
      ],
      flaggedCommits: [
        "57f03c1fbdb46483e8be0dd6ed43fe0e8196fd68",
        "7ea9aaa684cd7e6947db2741227b58f348376b16"
      ],
      flaggedCategories: ["auth/username"],
      totalDiscoveries: 317
    },
    {
      id: "77",
      rid: "4",
      started: "2019-09-06T20:33:37.208821Z",
      completed: "2019-09-06T00:33:00Z",
      rulesUsed: [
        "80dde9191eb55d78f8c99ace68aec1cee8d7ba64\n",
        "b9224e95d02ff7189a16993fd02d1a85af24ce43\n"
      ],
      flaggedCommits: [
        "57f03c1fbdb46483e8be0dd6ed43fe0e8196fd68",
        "7ea9aaa684cd7e6947db2741227b58f348376b16"
      ],
      flaggedCategories: ["auth/password"],
      totalDiscoveries: 217
    },
    {
      id: "78",
      rid: "4",
      started: "2019-09-06T21:33:37.208821Z",
      completed: "2019-09-06T00:33:00Z",
      rulesUsed: [
        "80dde9191eb55d78f8c99ace68aec1cee8d7ba64\n",
        "b9224e95d02ff7189a16993fd02d1a85af24ce43\n"
      ],
      flaggedCommits: [
        "57f03c1fbdb46483e8be0dd6ed43fe0e8196fd68",
        "7ea9aaa684cd7e6947db2741227b58f348376b16"
      ],
      flaggedCategories: ["auth/password"],
      totalDiscoveries: 117
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

module.exports = {
  get
}
