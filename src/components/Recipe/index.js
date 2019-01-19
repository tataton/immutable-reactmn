import React, { Component } from 'react';
import styles from './Recipe.module.css';
import plural from '../../remote/plural';
import debugRender from 'react-render-debugger';

class Recipe extends Component {
  state = {};
  render() {
    const { day, recipe, double } = this.props;
    return (
      <div className={styles.recipe}>
        <div className={styles.title}>
          <div className={styles.titleName}>{recipe.name}</div>
          <div className={styles.titleDay}>{day}</div>
        </div>
        <div className={styles.list}>
          {recipe.ingredients.map(ingredient => (
            <div className={styles.row} key={ingredient.name}>
              <div className={styles.item}>{ingredient.number}</div>
              {ingredient.measure && (
                <div className={styles.item}>{ingredient.measure}</div>
              )}
              <div className={styles.item}>
                {ingredient.number === 1 && !ingredient.measure
                  ? ingredient.name
                  : plural(ingredient.name)}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.footer}>
          {day !== 'Thursday' && (
            <button
              onClick={() => {
                double(day);
              }}
            >
              Double this recipe for
              <br />
              the in-laws on Thursday
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default debugRender(Recipe);
