var React = require("react");
var ReactDOM = require("react-dom");
var Search = require("./components/Search.jsx");

var Saved = require("./components/Saved.jsx")
var routes = require("./utils/config.jsx");
ReactDOM.render( routes , document.getElementById("app"));