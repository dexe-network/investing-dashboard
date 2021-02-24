/* eslint-disable */
import { storiesOf } from '@storybook/react';
import Funds from './index';
import { Orientation } from 'constants/types';

storiesOf('Funds', module).add('default', () => <Funds type={Orientation.horizontal} />);
