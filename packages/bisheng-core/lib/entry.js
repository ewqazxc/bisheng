const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const Route = ReactRouter.Route;
const toReactComponent = require('jsonml-to-react-component');
const exist = require('exist.js');
const data = require('./loaders/bisheng.data');

function templateWrapper(Template) {
  return (props) => {
    return React.createElement(
      Template,
      Object.assign({}, props, {
        data: data.markdown,
        utils: {
          get: exist.get,
          toReactComponent,
        }
      })
    );
  };
}

const theme = data.theme;
const routes = Object.keys(theme.routes).map((path, index) => {
  return React.createElement(Route, {
    key: index,
    path,
    component: templateWrapper(theme.routes[path]),
  });
});
routes.push(React.createElement(Route, {
  key: 'not found',
  path: '*',
  component: templateWrapper(data.notFound)
}));

ReactDOM.render(
  React.createElement(ReactRouter.Router, {
    history: ReactRouter.browserHistory,
    children: routes,
  }),
  document.getElementById('react-content')
);
