/* eslint-disable */
import { storiesOf } from '@storybook/react';
import PostCard from './index';

const news = [
  {
    description: `It may be wise to pay attention to $POLS & $SWAP.
    With the amount of launchpad sales coming & the fact that aoeuasnoehuih a-noehtusnaoheu`,
    comments: [],
    created_at: "12 hours ago",
  },
  {
    description: `Биржа AAX на наших глазах продолжает стремительное движение в Топ мирового рейтинга фьючерсных wuteuthasoetuhasoeuh satoheusnthao asoehu saho eshu ash snhaoentuh noehu sah sa shosehusn hasnoeh snh`,
    comments: [1],
    created_at: "12 hours ago",
  },
]

export const feed = [
  {
    id: "0",
    symbol: "WBDX",
    name: "Warren Buffet",
    price: "12.038",
    pnl: 3.55,
    posts: news,
  },
  {
    id: "1",
    symbol: "ISDX",
    name: "Irvine Smith",
    price: "12.038",
    pnl: 3.55,
    posts: news,
  },
  {
    id: "2",
    symbol: "GORE",
    name: "Garry Porter",
    price: "123",
    pnl: 123,
    posts: news,
  },
  {
    id: "3",
    symbol: "FKOF",
    name: "Skruge Macdag",
    price: "0.03801320",
    pnl: -1.55,
    posts: news,
  },
]


storiesOf('PostCard', module).add('default', () => <PostCard data={news[0]} />);
