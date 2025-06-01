import React from "react"
import ReactDOMServer from "react/server"

ReactDOMServer.renderToStaticMarkup(
    React.createElement(App, {teas})
)