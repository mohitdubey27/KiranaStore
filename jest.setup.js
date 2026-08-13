// Prevent Jest from importing ESM-only dependencies during unit tests.
// react-navigation packages are ESM in some versions and Jest (CommonJS) can't parse them.

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }) => children,
}));

jest.mock('@react-navigation/native-stack', () => {
  const React = require('react');

  return {
    createNativeStackNavigator: () => {
      const Navigator = ({ children }) =>
        React.createElement(React.Fragment, null, children);
      const Screen = () => React.createElement(React.Fragment, null);

      // Provide the exact shape expected by react-navigation usage
      return {
        Navigator,
        Screen,
      };
    },
  };
});

// react-native-keyboard-aware-scroll-view uses ESM syntax in some entrypoints;
// stub it out for unit tests (screens logic is what we care about).
jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const React = require('react');
  const { View } = require('react-native');

  const KeyboardAwareScrollView = ({ children, ...props }) =>
    React.createElement(View, { ...props }, children);

  return { KeyboardAwareScrollView };
});
