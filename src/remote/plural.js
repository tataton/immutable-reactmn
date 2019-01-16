const pluralMap = {
  meatball: 'meatballs',
  tortilla: 'tortillas',
  tomato: 'tomatoes',
  onion: 'onions',
  avocado: 'avocados',
  lime: 'limes',
  pineapple: 'pineapples',
  cucumber: 'cucumbers',
  'red onion': 'red onions'
};

function plural(singular) {
  return pluralMap[singular] || singular;
}

export default plural;
