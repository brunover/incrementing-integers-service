const clone = require("clone")

const db = {}

const defaultData = {
  discoveries: [
    {
      id: "87a1d10bcd9c2613e9b270d0c389ca0fb1a7bd62\n",
      rid: "4",
      category: "auth/password",
      content: "password: 'PASSWORD'",
      entries: [
        {
          fileName: "temp_file.csv",
          commitID: "57f03c1fbdb46483e8be0dd6ed43fe0e8196fd68",
          snippet:
            "auth/username,docs/pages/mock-odata.md,password: 'PASSWORD'",
          linkCommit:
            "https://github.wdf.sap.corp/i831499/sgs-chfm-testdata.git/commit/a1b362be01511b2ad621bcfcad683c95e4413166?user=0000000",
          comment: "all states false",
          state: "",
          start: 39,
          end: 56,
          ruleId: "58",
          fileLink:
            "https://github.wdf.sap.corp/SMASH/SCCS/blob/a1b362be01511b2ad621bcfcad683c95e4413166/server/temp_storage/temp_file.csv"
        },
        {
          fileName: "project.properties",
          commitID: "57f03c1fbdb46483e8be0dd6ed43fe0e8196fd68",
          snippet:
            "auth/username,docs/pages/mock-odata.md,password: 'PASSWORD'",
          linkCommit:
            "https://github.wdf.sap.corp/i831499/sgs-chfm-testdata.git/commit/a1b362be01511b2ad621bcfcad683c95e4413166?user=0000000",
          comment: "all states false",
          state: "",
          start: 39,
          end: 56,
          ruleId: "58",
          fileLink:
            "https://github.wdf.sap.corp/SMASH/SCCS/blob/a1b362be01511b2ad621bcfcad683c95e4413166/server/temp_storage/temp_file.csv"
        }
      ]
    },
    {
      id: "28u6510bcd9c2613e9b270d0c389ca0fb1a5to9x\n",
      rid: "4",
      category: "auth/username",
      content: "username: 'DUMMY'",
      entries: [
        {
          fileName: "temp_file.csv",
          commitID: "a1b362be01511b2ad621bcfcad683c95e4413166",
          snippet: "auth/username,docs/pages/mock-odata.md,username: 'DUMMY'",
          linkCommit:
            "https://github.wdf.sap.corp/i831499/sgs-chfm-testdata.git/commit/a1b362be01511b2ad621bcfcad683c95e4413166?user=0000000",
          comment: "all states false",
          state: "",
          start: 39,
          end: 56,
          ruleId: "58",
          fileLink:
            "https://github.wdf.sap.corp/SMASH/SCCS/blob/a1b362be01511b2ad621bcfcad683c95e4413166/server/temp_storage/temp_file.csv"
        },
        {
          fileName: "project.properties",
          commitID: "a1b362be01511b2ad621bcfcad683c95e4413166",
          snippet: "auth/username,docs/pages/mock-odata.md,username: 'DUMMY'",
          linkCommit:
            "https://github.wdf.sap.corp/i831499/sgs-chfm-testdata.git/commit/a1b362be01511b2ad621bcfcad683c95e4413166?user=0000000",
          comment: "all states false",
          state: "",
          start: 39,
          end: 56,
          ruleId: "58",
          fileLink:
            "https://github.wdf.sap.corp/SMASH/SCCS/blob/a1b362be01511b2ad621bcfcad683c95e4413166/server/temp_storage/temp_file.csv"
        }
      ]
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
