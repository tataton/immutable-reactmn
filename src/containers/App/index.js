import React, { Component, Fragment } from 'react';
import * as http from '../../remote/http';
import styles from './App.module.css';
import Recipe from '../../components/Recipe';

class App extends Component {
  initialState = {
    destination: '',
    recipes: {
      Tuesday: {
        name: 'Tacos',
        ingredients: [
          {
            name: 'tortillas',
            number: 10,
            measure: ''
          }
        ]
      }
    },
    error: ''
  };

  constructor() {
    super();
    this.state = this.initialState;
  }

  componentDidMount() {
    http
      .getInitialShoppingList()
      .then(result => {
        this.setState(result);
      })
      .catch(() => {
        this.setState({ error: 'Error retrieving shopping list' });
      });
  }

  render() {
    const { destination, recipes, error } = this.state;
    return (
      <Fragment>
        <header>
          <h1>Andy's Shopping List</h1>
        </header>
        {error && <div className={styles.error}>{error}</div>}
        {destination && (
          <div className={styles.destination}>
            Next shopping trip: {destination}
          </div>
        )}
        <main>
          {Object.keys(recipes).map(day => (
            <Recipe day={day} recipe={recipes[day]} />
          ))}
        </main>
      </Fragment>
    );
  }
}

export default App;
