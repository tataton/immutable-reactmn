// Built with Immutable.JS for managing React state.

import React, { Component, Fragment } from 'react';
import * as http from '../../remote/http';
import styles from './App.module.css';
import Recipe from '../../components/Recipe';
import debugRender from 'react-render-debugger';

const { fromJS, Map } = require('immutable');

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
    // Unfortunately, React requires that this.state be a JS object, so we can't
    // Just set this.state = fromJS(this.initialState). That's probably okay here--
    // we don't really need Immutable.JS to help us with the destination string.
    // We'll just make recipes immutable.
    this.state = {
      destination: this.initialState.destination,
      recipes: fromJS(this.initialState.recipes)
    };
  }

  componentDidMount() {
    this.getShoppingList();
  }

  shouldComponentUpdate(_, nextState) {
    if (nextState) {
      // Check for content equality using Immutable.Map.equals()
      return !nextState.recipes.equals(this.state.recipes);
    }
    return true;
  }

  getShoppingList = () => {
    http.getShoppingList().then(result => {
      this.setState({
        destination: result.destination,
        recipes: fromJS(result.recipes)
      });
    });
  };

  // Some Immutable methods are analogous to JS, and some ae not.
  // For example, .get() needs to be used to read values in an Immutable,
  // and .merge() can be used in place of nested JS Object spreads or
  // Object.assign() to incorporate changes. But other methods, like
  // Immutable.List.map, provide Immutable analogues to built-in JS methods.
  doubleTheIngredients = ingredients => {
    const newIngredients = ingredients.map(ingredient =>
      ingredient.merge({ number: ingredient.get('number') * 2 })
    );
    return newIngredients;
  };

  // Immutable.Map.getIn() allows us to pluck a value that is deeply nested
  // inside an Immutable.
  doubleThisRecipeForThursday = day => {
    this.setState(prevState => {
      const thursdayRecipe = Map({
        name: 'Double ' + prevState.recipes.getIn([day, 'name']),
        ingredients: this.doubleTheIngredients(
          prevState.recipes.getIn([day, 'ingredients'])
        )
      });
      return {
        recipes: prevState.recipes.merge({ Thursday: thursdayRecipe })
      };
    });
  };

  render() {
    const { destination, recipes } = this.state;
    // Console.logging an Immutable makes a mess in the console. Fortunately,
    // there is an Immutable object formatter Chrome extension available:
    // https://tinyurl.com/immutable-chrome-ext
    console.log(recipes);
    // One downside to Immutable.JS data structures is that they don't play well
    // with JSX and the DOM. Front-end code is really designed to work with
    // native objects and arrays. So you'll need to convert Immtables back to
    // JS in order to do anything useful.
    const recipesInJS = recipes.toJS();
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
          {Object.keys(recipesInJS).map(day => (
            <Recipe
              day={day}
              key={day}
              recipe={recipesInJS[day]}
              double={this.doubleThisRecipeForThursday}
            />
          ))}
        </main>
      </Fragment>
    );
  }
}

export default debugRender(App);
