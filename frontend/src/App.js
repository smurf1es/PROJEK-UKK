import { Box } from '@chakra-ui/layout';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Header = lazy(() => import('./components/Header'));
const Login = lazy(() => import('./pages/LoginPage'));
const Register = lazy(() => import('./pages/RegisterPage'));
const Home = lazy(() => import('./pages/HomePage'));
const NotFound = lazy(() => import('./pages/NotFoundPage'));
const Comment = lazy(() => import('./pages/CommentPage'));
const Officer = lazy(() => import('./pages/OfficerListPage'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Header />
        <Switch>
          <Route path="/report/:id/comment" component={Comment} />
          <Route path="/officer/list" component={Officer} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
