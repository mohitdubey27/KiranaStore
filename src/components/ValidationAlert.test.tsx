import React from 'react';
import renderer from 'react-test-renderer';
import ValidationAlert from './ValidationAlert';

describe('ValidationAlert', () => {
  it('renders the validation message when visible', () => {
    const tree = renderer.create(
      <ValidationAlert visible message="Please select an item" type="error" />,
    );

    expect(
      tree.root.findByProps({ testID: 'validation-alert-message' }).props
        .children,
    ).toBe('Please select an item');
  });

  it('calls onClose when the close button is pressed', () => {
    const onClose = jest.fn();
    const tree = renderer.create(
      <ValidationAlert
        visible
        message="Please select an item"
        type="error"
        onClose={onClose}
      />,
    );

    tree.root.findByProps({ testID: 'validation-alert-close' }).props.onPress();

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('returns null when hidden', () => {
    const tree = renderer.create(
      <ValidationAlert
        visible={false}
        message="Please select an item"
        type="error"
      />,
    );

    expect(tree.toJSON()).toBeNull();
  });
});
