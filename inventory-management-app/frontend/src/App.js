import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Reports from './pages/Reports';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <main style={{ marginTop: '2rem' }}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products" component={Products} />
            <Route path="/reports" component={Reports} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;