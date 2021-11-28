import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Comments from '../pages/Comments';
import News from '../pages/News';
import About from '../pages/About';
import Metrics from '../pages/Metrics';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/about" component={About} open />
    <Route path="/metrics" component={Metrics} open />

    <Route path="/news/:newsId/comments" component={Comments} open />
    <Route path="/news" component={News} open />

    <Route path="/comments/:newsId" component={Comments} open />
    <Route path="/home" component={Home} isPrivate />
  </Switch>
);

export default Routes;
