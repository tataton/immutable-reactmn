export const getInitialShoppingList = () => {
  return Promise.resolve({
    destination: 'Cub Foods',
    recipes: {
      Monday: {
        name: 'Pasta and Broccoli',
        ingredients: [
          {
            name: 'spaghetti',
            number: 1,
            measure: 'lb'
          },
          {
            name: 'tomato sauce',
            number: 12,
            measure: 'oz'
          },
          {
            name: 'meatball',
            number: 8,
            measure: ''
          },
          {
            name: 'broccoli',
            number: 1,
            measure: 'head'
          },
          {
            name: 'italian bread',
            number: 1,
            measure: 'loaf'
          },
          {
            name: 'parmesan',
            number: 6,
            measure: 'oz'
          }
        ]
      },
      Tuesday: {
        name: 'Chicken Tacos',
        ingredients: [
          {
            name: 'tortilla',
            number: 10,
            measure: ''
          },
          {
            name: 'boneless chicken breast',
            number: 1,
            measure: 'lb'
          },
          {
            name: 'salsa',
            number: 1,
            measure: 'jar'
          },
          {
            name: 'queso fresco',
            number: 1,
            measure: 'pkg'
          },
          {
            name: 'tomato',
            number: 2,
            measure: ''
          },
          {
            name: 'onion',
            number: 1,
            measure: ''
          },
          {
            name: 'avocado',
            number: 1,
            measure: ''
          },
          {
            name: 'lime',
            number: 2,
            measure: ''
          },
          {
            name: 'cilantro',
            number: 1,
            measure: 'bunch'
          }
        ]
      },
      Wednesday: {
        name: 'Salmon and Salad',
        ingredients: [
          {
            name: 'salmon filet',
            number: 1,
            measure: 'lb'
          },
          {
            name: 'white rice',
            number: 2,
            measure: 'cups'
          },
          {
            name: 'pineapple',
            number: 0.5,
            measure: ''
          },
          {
            name: 'cucumber',
            number: 1,
            measure: ''
          },
          {
            name: 'tomato',
            number: 2,
            measure: ''
          },
          {
            name: 'red onion',
            number: 0.5,
            measure: ''
          },
          {
            name: 'feta',
            number: 8,
            measure: 'oz'
          }
        ]
      }
    }
  });
};
