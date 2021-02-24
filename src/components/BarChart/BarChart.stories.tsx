/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import BarChart from './index';

export const fakeData = [
  {
    from: 1613123831889,
    to: 1613123291889,
    pnl: 5
  },
  {
    from: 1613123891489,
    to: 1613123291889,
    pnl: -45
  },
  {
    from: 1613123891879,
    to: 1613123291889,
    pnl: 0
  },
  {
    from: 1613123891880,
    to: 1613123291889,
    pnl: 25
  },
  {
    from: 1613123891859,
    to: 1613123291889,
    pnl: -85
  },
  {
    from: 1613123891883,
    to: 1613123291889,
    pnl: 15
  },
  {
    from: 1613123891289,
    to: 1613123291889,
    pnl: 35
  },
  {
    from: 1613123891886,
    to: 1613123291889,
    pnl: 26
  },
  {
    from: 1613123891589,
    to: 1613123291889,
    pnl: 37
  },
  {
    from: 1613123892989,
    to: 1613123291889,
    pnl: 49
  },
  {
    from: 1613123841839,
    to: 1613123291889,
    pnl: 79
  },
  {
    from: 1613124891839,
    to: 1613123291889,
    pnl: 50
  },
]

export const fakeZeroData = [
  {
    from: 1613123831889,
    to: 1613123291889,
    pnl: 0
  },
  {
    from: 1613123891489,
    to: 1613123291889,
    pnl: 0
  },
  {
    from: 1613123891879,
    to: 1613123291889,
    pnl: 0
  },
  {
    from: 1613123891880,
    to: 1613123291889,
    pnl: 0
  },
  {
    from: 1613123891859,
    to: 1613123291889,
    pnl: 0
  },
  {
    from: 1613123891883,
    to: 1613123291889,
    pnl: 0
  },
  {
    from: 1613123891289,
    to: 1613123291889,
    pnl: 0
  },
  {
    from: 1613123891886,
    to: 1613123291889,
    pnl: 0
  },
  {
    from: 1613123891589,
    to: 1613123291889,
    pnl: 0
  },
  {
    from: 1613123892989,
    to: 1613123291889,
    pnl: 0
  },
  {
    from: 1613123841839,
    to: 1613123291889,
    pnl: 0
  },
  {
    from: 1613124891839,
    to: 1613123291889,
    pnl: 0
  },
]

storiesOf('BarChart', module).add('default', () => <BarChart />);
