This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Notes

- the starting point for this app was `npx create-react-app my-app --template redux-typescript-mui`
- I am unsure if I've implemented the 'fullscreen detail view' as you were expecting, but I've run out of time.
- The main tradeoffs I made in designing this solution were:
  - choosing to use an NPM module for the infinite scroll rather than coding my own. From looking at that library's source it does not seem to limit how much DOM it renders, which would be a performance feature I would incorporate into an implementation I'd write from scratch.
  - I also chose to use the Giphy Fetch API, as that seemed like a no-brainer
  - I didn't opt to try and hack a solution into the Giphy Grid component to make it work with Redux -- that tradeoff was where I invested most of my time.
  - I opted to try to get through the functionality rather than write tests.
  - I didn't have time to add error messaging to the user, just console logging
- overall this came out OK, TypeScript is newish to me (as you can probably see) and I'm not as fast with it quite yet -- it is growing on me though :)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
