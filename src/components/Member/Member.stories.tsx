/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Member from './index';

storiesOf('Member', module).add('default', () => (
  <Member
    avatar="https://pickaface.net/gallery/avatar/44947415_161203_0634_2om7fql.png"
    rank={4.2}
    name="Irvine Smith"
    copiers={12}
    pnl={123}
    tradersFunds={123}
    totalFunds={450}
    traderFee={35}
  />
  )
);
