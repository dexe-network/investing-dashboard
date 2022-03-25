import styled from "styled-components"

export const Container = styled.div`
  margin: 0 auto;
  bacground-color: #040a0f;
  width: fill-available;
  height: fill-available;
`

export const Header = styled.div`
  box-sizing: border-box;
  padding: 0 17px;
`

export const HeaderContent = styled.div`
  box-sizing: border-box;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
`

export const MainTitle = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 20px;
  text-align: center;
  color: #c5d1dc;
`

export const Line = styled.div`
  width: fill-available;
  height: 1px;
  background: radial-gradient(
      54.8% 53% at 50% 50%,
      #587eb7 0%,
      rgba(88, 126, 183, 0) 100%
    ),
    radial-gradient(
      60% 51.57% at 50% 50%,
      #6d99db 0%,
      rgba(109, 153, 219, 0) 100%
    ),
    radial-gradient(
      69.43% 69.43% at 50% 50%,
      rgba(5, 5, 5, 0.5) 0%,
      rgba(82, 82, 82, 0) 100%
    );
  opacity: 0.1;
`

export const Body = styled.div`
  margin-top: 67px;
  width: fill-available;
  background: #08121a;
  box-shadow: 0px -3px 102px 2px rgba(149, 185, 255, 0.26);
  border-radius: 26px 26px 0px 0px;
`

export const Steps = styled.div`
  padding: 0 17px 0 6px;
`

export const Step = styled.div`
  margin-bottom: 81px;
`
export const FundTypeCards = styled.div`
  margin-bottom: 81px;
`
