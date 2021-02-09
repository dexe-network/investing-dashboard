/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Menu from './index';
import StoryRouter from 'storybook-react-router';


storiesOf('Menu', module)
  .addDecorator(StoryRouter())
  .add('default', () => <Menu />);
