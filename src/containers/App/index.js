import React, { Component, Fragment } from 'react';
import * as http from '../../remote/http';
import styles from './App.module.css';
import Recipe from '../../components/Recipe';
import debugRender from 'react-render-debugger';

import { produce } from 'immer';

class App extends Component {
  initialState = {
    destination: '', // where I'll shop
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
    }
  };

  constructor() {
    super();
    // With immer, this.state and its nested structures can stay JS Objects
    // and Arrays. No need for exotic new types or methods!
    this.state = this.initialState;
  }

  componentDidMount() {
    this.getShoppingList();
  }

  getShoppingList = () => {
    http.getShoppingList().then(result => {
      this.setState(result);
    });
  };

  // Returns new ingredients array with doubled amounts
  doubleTheIngredients = ingredients => {
    return ingredients.map(ingredient => ({
      ...ingredient,
      number: ingredient.number * 2
    }));
  };

  doubleThisRecipeForThursday = day => {
    this.setState(
      // We use immer's produce() function to allow us to make direct
      // mutations on a draft state. Theese are then reconciled by immer
      // to yield a new state object.
      produce(draft => {
        draft.recipes.Thursday = {
          name: 'Double ' + draft.recipes[day].name,
          ingredients: this.doubleTheIngredients(draft.recipes[day].ingredients)
        };
      })
    );
  };

  render() {
    const { destination, recipes } = this.state;
    return (
      <Fragment>
        <header>
          <h1>Andy's Shopping List</h1>
        </header>
        <div className={styles.destination}>
          Next shopping trip: {destination ? destination : 'Not yet set'}
        </div>
        <button onClick={this.getShoppingList}>
          Reload the week's recipes
        </button>
        <main>
          {Object.keys(recipes).map(day => (
            <Recipe
              day={day}
              key={day}
              recipe={recipes[day]}
              double={this.doubleThisRecipeForThursday}
            />
          ))}
        </main>
      </Fragment>
    );
  }
}

export default debugRender(App);
