This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Readable App
Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

# Structure
* readable-app
  - public
    - favicon.ico
    - index.html
    - manifest.json
  - src
    - actions # includes all actions for the redux store
    - components # includes all components for the app
    - css # Main css folder, component specific css is in the component folder
    - fonts # Nessesary fonts
    - img # Nesesary images
    - reducers # includes all reducers for the redux store
    - test # includes all test
    - util # includes util functionality like const values and such
  - .env # describes the default path so its easier to access paths
  - .eslintrc.json # eslint configuration
  - .gitignore # gitignore config
  - .package-lock.json # package history
  - .package.json # package list
  - README.md # readme