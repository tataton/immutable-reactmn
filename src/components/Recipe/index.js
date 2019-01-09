import React from 'react';
import styles from './Recipe.module.css';
import plural from '../../remote/plural';

const Recipe = props => {
  const { day, recipe } = props;
  return (
    <div className={styles.recipe}>
      <div className={styles.title}>
        <div className={styles.titleName}>{recipe.name}</div>
        <div className={styles.titleDay}>{day}</div>
      </div>
      <div className={styles.list}>
        {recipe.ingredients.map(ingredient => (
          <div className={styles.row}>
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
    </div>
  );
};

export default Recipe;
