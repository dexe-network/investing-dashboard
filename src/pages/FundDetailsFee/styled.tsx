import styled from "styled-components"
import { RotateSpinner } from "react-spinners-kit"

import { Flex, GradientBorder } from "theme"
import insuranceBG from "assets/background/insurance-card.svg"
import dexePlaceholder from "assets/icons/dexe-placeholder.svg"

export const Container = styled.div<{ loading?: boolean }>`
  position: relative;
  padding: 16px;
  width: fill-available;
  background: #0e121b;

  height: ${({ loading = false }) =>
    loading ? "calc(100vh - 128px)" : "initial"};

  @media all and (display-mode: standalone) {
    height: ${({ loading = false }) =>
      loading ? "calc(100vh - 149px)" : "initial"};
  }
`

export const FeeDateCard = styled(Flex)`
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 24px 15px;
  margin: 0 0 16px 0;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
  border: 1px solid #2f3c3a;

  z-index: 5;

  &:before {
    content: "";
    z-index: 4;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -8px;
    background: url(${insuranceBG});
    background-repeat: no-repeat;
  }
  &:after {
    content: "";
    z-index: 4;
    height: 79px;
    width: 79px;
    position: absolute;
    top: -6px;
    left: -6px;
    background: url(${dexePlaceholder});
    background-repeat: no-repeat;
  }
`
export const FeeDateText = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  color: #e4f2ff;
  letter-spacing: -0.3px;
`

export const LoadingContent = styled(Flex)`
  height: inherit;
`

export const PageLoading = () => (
  <Container loading>
    <LoadingContent full ai="center" jc="center" m="auto">
      <RotateSpinner />
    </LoadingContent>
  </Container>
)

export const MainCard = styled(GradientBorder)`
  width: 100%;
  padding: 13px 16px 20px;
  border-radius: 20px;
  flex-direction: column;

  &:after {
    background: #0f1421;
  }
`

export const MainCardTitle = styled.div<{ m?: string }>`
  margin: ${(props) => (props.m ? props.m : 0)};
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 1px;
  color: #e4f2ff;
`
export const MainCardDescription = styled.div<{ m?: string }>`
  margin: ${(props) => (props.m ? props.m : 0)};
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  color: #788ab4;
`

export const MainCardHeaderRight = styled.div`
  text-align: right;
`

// WITHDRAWAL HISTORY

export const WithdrawalHistoryStyled = {
  Title: styled.div`
    width: 100%;
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #e4f2ff;
  `,
  List: styled(GradientBorder)`
    width: 100%;
    padding: 16px;
    margin-top: 16px;
    border-radius: 15px;
    flex-direction: column;

    &:after {
      background: #0f1421;
    }
  `,

  ListHeader: styled.div`
    display: grid;
    grid-template-columns: 33% 35.7% 1fr;
    width: 100%;
    margin-bottom: 2px;
  `,
  ListHeaderItem: styled(Flex)`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: #788ab4;

    /* &:nth-child(1) {
      width: 28%;
    } */

    &:nth-child(2) {
      text-align: center;
    }
  `,
}
