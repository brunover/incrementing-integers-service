const qs = require("querystring")

// Serialize a obj to make it valid for request POST
export const serializeObj = obj => qs.stringify(obj)

// Case insensitive sort function for string values
export const sortByKey = (key = "Name", isDesc = false) => {
  return isDesc
    ? (a, b) => b[key].localeCompare(a[key])
    : (a, b) => a[key].localeCompare(b[key])
}

// Sort function for Date values
export const sortByDate = (key = "Started", isDesc = false) => {
  return isDesc
    ? (a, b) => new Date(b[key]) - new Date(a[key])
    : (a, b) => new Date(a[key]) - new Date(b[key])
}
