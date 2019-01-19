# immutable-reactmn

A companion project to my presentation on immutability libraries at ReactMN on January 17, 2019. Each stage of incorporating an immutable library is illustrated by a branch; since giving the talk, I've added comments to each branch's code that walk you through the changes I made.

The branches I worked through in my presentation:

- [js-object](https://github.com/tataton/immutable-reactmn/tree/js-object): Project built from native JavaScript data structures.
- [immutable-js](https://github.com/tataton/immutable-reactmn/tree/immutable-js): Same project, using Immutable.JS Maps and Lists for React state.
- [immer-js](https://github.com/tataton/immutable-reactmn/tree/immer-js): Same project again, but with state managed by immer's `produce` and `draft`.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This demonstration works through using immutability libraries with React state--and that's something you might not ever do in real life. I write this because, if your application is simple enough that you haven't incorporated state management or memoization/selection libraries, it's also probably simple enough that you don't really need immutability. In addition, one of the libraries I work through, Immutable.JS, comes with companion packages that makes it easier to integrate with Redux and selectors, so that it might even be _easier_ to use with complex projects than with just plain React.

So please don't use this demo as a template/starter for your own work. It's for illustration purposes only.
