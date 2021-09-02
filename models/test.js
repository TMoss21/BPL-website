const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const live = require("../models/Live.js")
const bootstrap = require("../models/Bootstrap.js")


let picks = [
  {
    element: 69,
    position: 1,
    multiplier: 1,
    is_captain: false,
    is_vice_captain: false
  },
  {
    element: 275,
    position: 2,
    multiplier: 1,
    is_captain: false,
    is_vice_captain: false
  },
  {
    element: 39,
    position: 3,
    multiplier: 1,
    is_captain: false,
    is_vice_captain: false
  },
  {
    element: 237,
    position: 4,
    multiplier: 1,
    is_captain: false,
    is_vice_captain: false
  },
  {
    element: 215,
    position: 5,
    multiplier: 1,
    is_captain: false,
    is_vice_captain: false
  },
  {
    element: 233,
    position: 6,
    multiplier: 2,
    is_captain: true,
    is_vice_captain: false
  },
  {
    element: 277,
    position: 7,
    multiplier: 1,
    is_captain: false,
    is_vice_captain: true
  },
  {
    element: 254,
    position: 8,
    multiplier: 1,
    is_captain: false,
    is_vice_captain: false
  },
  {
    element: 21,
    position: 9,
    multiplier: 1,
    is_captain: false,
    is_vice_captain: false
  },
  {
    element: 337,
    position: 10,
    multiplier: 1,
    is_captain: false,
    is_vice_captain: false
  },
  {
    element: 78,
    position: 11,
    multiplier: 1,
    is_captain: false,
    is_vice_captain: false
  },
  {
    element: 448,
    position: 12,
    multiplier: 0,
    is_captain: false,
    is_vice_captain: false
  },
  {
    element: 245,
    position: 13,
    multiplier: 0,
    is_captain: false,
    is_vice_captain: false
  },
  {
    element: 185,
    position: 14,
    multiplier: 0,
    is_captain: false,
    is_vice_captain: false
  },
  {
    element: 520,
    position: 15,
    multiplier: 0,
    is_captain: false,
    is_vice_captain: false
  }
]
