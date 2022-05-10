import styled from "styled-components"

export const Container = styled.div`
  margin: 0 auto;
  width: fill-available;
  height: calc(100vh - 128px);
  overflow-y: auto;

  @media all and (display-mode: standalone) {
    height: calc(100vh - 149px);
  }
`
