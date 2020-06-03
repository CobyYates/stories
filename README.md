# Stories

This is the prototype app for the Daniel Stories app used to view scripts and
movies together and sync up notes and screenplay to the movie timecodes.

# Prerequisites

## Knowledge

- You should be fairly comfortable reading technical instructions and reading
  code.
- You should know some basic command-line/terminal/linux commands.
- You should be comfortable with `git`
- You should be comfortable with `node` and modern JavaScript
- You should be fairly comfortable with the following libraries/frameworks:
  - [react][react] - A client-side library for composing user interfaces
  - [redux][redux] - A client-side library for managing client-state
  - There are more you'll run into and as this project evolves, but those are
    the main ones to watch out for.

## Software

For the following, if you are running on a Mac and you have [homebrew][homebrew]
installed, you can install any of these. A command to install them via homebrew
will be included.

- [git][git]: `brew install git` For cloning, commiting, pushing, collaboration.
- [node][node]: `brew install node` For running the server, and building assets.
  Must be on version 7 or greater.
- [yarn][yarn]: `brew install yarn` For running scripts.

It is also recommended that you have a text editor that has an `eslint` plugin
that can lint as you type. It is not required because you can run the linter
as a command outlined below.

# Installation

```
git clone <this repo url>
cd stories
yarn
yarn build
```

# Commands

- `yarn` - Install dependencies
- `yarn run start` - Starts the dev server
- `yarn run build` - Builds the client assets into a `build/` directory
- `yarn run lint` - Runs your code against the lint rules.
- `yarn add <dependency>` - Adds a dependency to your project
- `yarn remove <dependency>` - Removes a dependency from your project

# Directory Structure

## `build/`

This is the build directory. You should not change anything in this directory
and expect the change to persist since this directory is auto-generated. This is
also the directory that will get deployed.

## `node_modules/`

This is where your dependencies live. When you run `yarn`, it generates this
directory. You should also not mage any changes in here.

## `public/`

Files in here will will be copied over to the `build/` directory when you run
the build command, with the exception of `index.html`, which will have some
variables replaced to input the script tags and such.

## `src/`

This is where all of the source files exist. See below for how this directory is
structured.

### `src/index.js`

This is the entrypoint to the app. Everything required after this point will be
included in the bundle. This is typically where you link the app up to the
browser apis.

### `src/components/`

Each component should have their own directory. Each component can have
additional sub-components in them as well where it makes sense.

### `src/ducks/`

A `duck` is a redux "module" that contains all of the things you would need for
redux, namely:

- reducer
- actions
- actionCreators
- selectors
- etc...

Here's an example `duck`:

```js
import { handleActions, createAction } from 'redux-actions'
import { createSelector } from 'reselect'

export const actions = {
  createTodo: createAction('CREATE_TODO'),
  toggleTodo: createAction('TOGGLE_TODO'),
  clearCompletedTodos: createAction('CLEAR_COMPLETED_TODOS')
}

const initialState = {
  todos: []
}

export default handleActions({
  [actions.createTodo](state, action) {
    // Do your thang
  },
  [actions.toggleTodo](state, action) {
    // Do your thang
  },
  [actions.clearCompletedTodos](state, action) {
    // Do your thang
  }
}, inititalState)

export const selectors = {

}
```

### `src/movies/`

This is where our demo movies live. Look at the example `casa-blanca` movie to
see how that is structure in order to reproduce it.

<!-- links -->
[homebrew]: https://brew.sh/
[git]: https://git-scm.com/
[node]: https://nodejs.org/en/
[yarn]: https://yarnpkg.com/en/
[react]: https://facebook.github.io/react/
[redux]: http://redux.js.org/
