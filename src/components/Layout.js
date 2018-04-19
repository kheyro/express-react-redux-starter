import React from 'react';
import { Link, Switch, Route } from "react-router-dom";
import routes from "../../config/routes";
import style from './layout.css';

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome to React SSR!",
    };
  }

  render() {
    return (
      <div>
        <h1 className={style.title}>{ this.state.title }</h1>
        <div className='test'>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
        <Switch>
          { routes.map( route => <Route key={ route.path } { ...route } /> ) }
        </Switch>
      </div>
    );
  }
}

export default Layout;
