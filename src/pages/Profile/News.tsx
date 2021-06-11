import { useState } from "react"
import { Flex } from "theme"
import { Orientation } from "constants/types"
import { IPostGroup, IPost } from "constants/interfaces"
import {
  NewsList,
  Title,
  PostGroup,
  PostFooter,
  StyledNews,
  PostMore,
  ButtonSymbol,
  AngleRight,
  PostSymbol,
  PostName,
  PostPrice,
  PostPnl,
  PersonalPostList,
} from "pages/Profile/styled"
import PostCard from "components/PostCard"
import PostBox from "components/PostBox"

const PostsList: React.FC<{ d: IPostGroup[] }> = (props) => {
  return (
    <>
      {props.d.map((pg) => (
        <Flex full dir={Orientation.vertical} key={pg.id}>
          <Flex p="0 0 5px" full jc="flex-start">
            <PostSymbol>{pg.symbol}</PostSymbol>
            <PostName>{pg.name}</PostName>
          </Flex>
          <Flex full jc="flex-start">
            <PostPrice>{pg.price}</PostPrice>
            <PostPnl val={pg.pnl}>
              {`${pg.pnl >= 0 ? "+" : ""}${pg.pnl}`}%
            </PostPnl>
          </Flex>
          <PostGroup>
            {pg.posts.map((post: IPost) => (
              <PostCard key={post.created_at} data={post} />
            ))}
          </PostGroup>
          <PostFooter jc="flex-end" full>
            <PostMore>
              MORE
              <ButtonSymbol>
                {pg.symbol}
                <AngleRight />
              </ButtonSymbol>
            </PostMore>
          </PostFooter>
        </Flex>
      ))}
    </>
  )
}

const News: React.FC<{ data: IPostGroup[] }> = (props) => {
  const [activeTab, setActiveTab] = useState(1)
  const list = props.data

  return (
    <StyledNews>
      <Flex jc="flex-start" p="5px 35px 0" full>
        <Title
          onClick={() => setActiveTab(1)}
          weight={activeTab === 1 ? 800 : 300}
        >
          NEWS FEED
        </Title>
        <Title
          onClick={() => setActiveTab(2)}
          weight={activeTab === 2 ? 800 : 300}
        >
          MY FEED
        </Title>
      </Flex>
      <NewsList
        p="0 39px"
        dir={Orientation.vertical}
        jc="flex-start"
        full
        className="scrollable-content"
      >
        {activeTab === 1 ? (
          <PostsList d={list} />
        ) : (
          <>
            <PostBox />
            <PersonalPostList>
              {[...list[0].posts, ...list[0].posts].map((post: IPost) => (
                <Flex key={post.created_at} p="15px 0" full>
                  <PostCard border data={post} />
                </Flex>
              ))}
            </PersonalPostList>
          </>
        )}
      </NewsList>
    </StyledNews>
  )
}

export default News
