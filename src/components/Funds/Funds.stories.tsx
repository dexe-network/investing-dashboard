/* eslint-disable */
import { storiesOf } from '@storybook/react';
import Funds from './index';
import { Orientation } from 'constants/types';

storiesOf('Funds', module).add('default', () => <Funds active="https://tokens.1inch.exchange/0xdac17f958d2ee523a2206206994597c13d831ec7.png" type={Orientation.horizontal} />);
