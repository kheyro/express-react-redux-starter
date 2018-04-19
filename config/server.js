import express from "express";
import path from "path";
import logger from 'morgan';

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./routes";
import Layout from "../src/components/Layout";
import createStore from "./store";
import { initializeSession } from "../src/actions/session";

const app = express();
app.use(logger('dev'));

app.use( express.static( path.resolve( __dirname, "../build" ) ) );

app.get( "*", ( req, res ) => {
  const context = {};
  const store = createStore();

  store.dispatch(initializeSession());

  const dataRequirements =
    routes
      .filter( route => matchPath( req.url, route ) ) // filter matching paths
      .map( route => route.component ) // map to components
      .filter( comp => comp.serverFetch ) // check if components have data requirement
      .map( comp => store.dispatch( comp.serverFetch( ) ) ); // dispatch data requirement

  Promise.all( dataRequirements ).then( ( ) => {
    const jsx = (
      <Provider store={ store }>
        <StaticRouter context={ context } location={ req.url }>
          <Layout />
        </StaticRouter>
      </Provider>
    );

    if (context.status === 404) {
      res.status(404);
    }
    if (context.status === 302 || context.status === 301) {
      return res.redirect(302, context.url);
    }

    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end(htmlTemplate(renderToString(jsx), store.getState()));
  } );
} );

function htmlTemplate( reactDom, reduxState ) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>React SSR</title>
        <link rel="stylesheet" type="text/css" href="./styles.css">
    </head>

    <body>
        <div id="app">${ reactDom }</div>
        <script>
            window.REDUX_DATA = ${ JSON.stringify( reduxState ) }
        </script>
        <script src="./app.bundle.js"></script>
    </body>
    </html>`;
}

module.exports = app;