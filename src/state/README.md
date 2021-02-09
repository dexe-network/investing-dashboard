## What's Included

Redux Toolkit includes these APIs:

- `configureStore()`: wraps `createStore` to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes `redux-thunk` by default, and enables use of the Redux DevTools Extension.
- `createReducer()`: that lets you supply a lookup table of action types to case reducer functions, rather than writing switch statements. In addition, it automatically uses the [`immer` library](https://github.com/mweststrate/immer) to let you write simpler immutable updates with normal mutative code, like `state.todos[3].completed = true`.
- `createAction()`: generates an action creator function for the given action type string. The function itself has `toString()` defined, so that it can be used in place of the type constant.
- `createSlice()`: accepts an object of reducer functions, a slice name, and an initial state value, and automatically generates a slice reducer with corresponding action creators and action types.
- `createAsyncThunk`: accepts an action type string and a function that returns a promise, and generates a thunk that dispatches `pending/resolved/rejected` action types based on that promise
- `createEntityAdapter`: generates a set of reusable reducers and selectors to manage normalized data in the store
- The `createSelector` utility from the [Reselect](https://github.com/reduxjs/reselect) library, re-exported for ease of use.

## Documentation

The Redux Toolkit docs are available at **https://redux-toolkit.js.org**.