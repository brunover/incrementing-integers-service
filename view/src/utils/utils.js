const qs = require("querystring")
export const ONE_KILOBYTE = 1024
export const ONE_MEGABYTE = 1048576

// Given a file size in bytes, makes it more readable
export const formatFileSize = size => {
  if (size < ONE_KILOBYTE) {
    return size + " byte" + (size === 1 ? "" : "s")
  } else if (size >= ONE_KILOBYTE && size < ONE_MEGABYTE) {
    return (size / ONE_KILOBYTE).toFixed(1) + "KB"
  } else {
    return (size / ONE_MEGABYTE).toFixed(1) + "MB"
  }
}

// Find and returns the key associated to a value in a javascript Map object
export const getKeyByValue = (map, value) => {
  const entry = [...map].find(([mapKey, mapVal]) => mapVal.includes(value))
  // If an entry was found return its key (first index)
  return entry ? entry[0] : null
}

// Serialize a obj to make it valid for request POST
export const serializeObj = obj => qs.stringify(obj)

// Formats a code snippet to highlight the piece of code which matches the content
export const formatSnippet = (snippet, content, maxCharQty = 200) => {
  // First try to format snippet to have the maximum characters informed by the parameter
  const offset = content.length * 2
  if (snippet.length > maxCharQty && snippet.length > offset) {
    try {
      const indexOfContent = snippet.indexOf(content)
      const start = indexOfContent - offset
      const end = indexOfContent + content.length + offset
      snippet = snippet.substring(start, end)
    } catch (error) {
      console.error(error)
    }
  }
  const newSnippet = snippet
    // Here we add white spaces to angle brackets to avoid
    // the browser interpreting the content as HTML tags
    .replace(/</g, " < ")
    .replace(/>/g, " > ")
    // After that we add a <mark> tag to the original content,
    // it will insert a highlighting yellow background
    .replace(content, `<mark>${content}</mark>`)
  return newSnippet
}

// A text may be too long to appear in tables, the formatText will
// reduce it and put trailing dots at the end
export const formatText = (text, maxCharQty = 15) => {
  return text.length > maxCharQty ? `${text.substring(0, maxCharQty)}...` : text
}

// Given a state object, returns the name, glyph and class
// to represent it on the HTML
export const getStateHTMLInfo = stateObj => {
  switch (stateObj.State) {
    case "addressing": {
      return {
        name: "Addressing",
        glyph: "thumb-up",
        class: "fd-badge"
      }
    }
    case "false": {
      return {
        name: "False positive",
        glyph: "decline",
        class: "fd-badge fd-badge--error"
      }
    }
    case "fixed": {
      return {
        name: "Fixed",
        glyph: "accept",
        class: "fd-badge fd-badge--success"
      }
    }
    case "irrelevant": {
      return {
        name: "Not relevant",
        glyph: "thumb-down",
        class: "fd-badge fd-badge--warning"
      }
    }
    default: {
      return {
        name: "New",
        glyph: "target-group",
        class: "fd-counter"
      }
    }
  }
}

// Renders a HTML Badge to be used anywhere around
// the application with "dangerouslySetInnerHTML"
export const renderStateHTMLBadge = (stateId, discoveriesStates) => {
  const stateObj = discoveriesStates.find(d => d.Id === stateId)
  const stateHTMLObj = getStateHTMLInfo(stateObj)
  return `<span key='${stateHTMLObj.name}' class='${stateHTMLObj.class}'>${stateHTMLObj.name}</span>`
}

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
