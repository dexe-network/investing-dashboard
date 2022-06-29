import { Link } from "react-router-dom"
import styled from "styled-components"

import { Flex } from "theme"

const Styled = {
  Tabs: styled(Flex)`
    justify-content: space-between;
    width: calc(100% - 32px);
    padding: 0;
    margin: 16px 16px 0;
    background: #121722;
    border: 1px solid rgba(41, 60, 84, 0.5);
    border-radius: 12px;
  `,
  Tab: styled(Link)<{ active?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 0 auto;
    padding: 6.5px 18px;
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    text-decoration: none;
    border-radius: 12px;
    color: ${(props) => (props.active ? "#E4F2FF" : "#788ab4")};
    background: ${(props) => (props.active ? " #181e2c" : "transparent")};
    transition: background ease-in-out 0.15s;
    cursor: pointer;
    position: relative;
  `,
  TabAmount: styled(Flex)`
    min-width: 12px;
    height: 12px;
    margin-left: 4px;
    padding: 3px 4px 2px 3.5px;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    background: linear-gradient(267.88deg, #d75e65 -0.85%, #e77171 98.22%);
    font-weight: 700;
    font-size: 9px;
    line-height: 8px;
    color: #ffffff;
  `,

  Content: styled.div`
    height: calc(100vh - 174px);
    padding: 16px;
    position: relative;
    overflow-y: auto;

    @media all and (display-mode: standalone) {
      height: calc(100vh - 197px);
    }
  `,
}

export default Styled
