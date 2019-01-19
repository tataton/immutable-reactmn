import React, { Component, Fragment } from 'react';
import * as http from '../../remote/http';
import styles from './App.module.css';
import Recipe from '../../components/Recipe';
import debugRender from 'react-render-debugger';

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

  // Returns new ingredients array with doubled amounts...but also
  // mutates state. (Bad!) And no React console warning is thrown,
  // because the mutation is in a referenced object, not on state itself.
  // Let's imagine we weren't responsible for this method, that someone
  // else wrote it. How would we ever catch their bug?
  doubleTheIngredients = ingredients => {
    const newIngredients = [];
    ingredients.forEach(ingredient => {
      ingredient.number *= 2;
      newIngredients.push(ingredient);
    });
    return newIngredients;
  };

  doubleThisRecipeForThursday = day => {
    this.setState(prevState => {
      return {
        recipes: {
          ...prevState.recipes,
          Thursday: {
            name: 'Double ' + prevState.recipes[day].name,
            ingredients: this.doubleTheIngredients(
              prevState.recipes[day].ingredients
            )
          }
        }
      };
    });
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
