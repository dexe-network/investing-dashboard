import styled from "styled-components"

export const Container = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 3px;

  text-decoration: none;
`

export const Text = styled.span<{
  color: string
  iconPosition: string
  fw?: string
  fz?: string
}>`
  color: ${({ color }) => color ?? "white"};
  order: ${({ iconPosition }) => (iconPosition === "right" ? "0" : "1")};
  font-family: "Gilroy";
  font-style: normal;
  font-weight: ${({ fw }) => fw ?? "400"};
  font-size: ${({ fz }) => fz ?? "12px"};
  line-height: ${({ fz }) => fz ?? "12px"};
  letter-spacing: 0.03em;
  margin-top: 3px;
`

const IconContainer = styled.div<{ iconPosition: string }>`
  order: ${({ iconPosition }) => (iconPosition === "right" ? "1" : "0")};
  width: 15px;
  height: 15px;

  svg {
    width: 100%;
    height: 100%;
  }
`

export const BaseIcon = ({ color, iconPosition }) => {
  return (
    <IconContainer iconPosition={iconPosition}>
      <svg fill="none">
        <path
          d="M6.857 4H4.571A.571.571 0 0 0 4 4.571v6.858c0 .315.256.571.571.571h6.858a.571.571 0 0 0 .571-.571V9.143"
          stroke={color}
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.117 6.667a.55.55 0 0 0 1.1 0h-1.1Zm.55-3.334h.55a.55.55 0 0 0-.55-.55v.55Zm-3.333-.55a.55.55 0 0 0 0 1.1v-1.1Zm3.883 3.884V3.333h-1.1v3.334h1.1Zm-.55-3.884H9.334v1.1h3.333v-1.1Z"
          fill={color}
        />
        <path
          d="M8.278 6.944a.55.55 0 0 0 .777.778l-.777-.778Zm4.11-2.555a.55.55 0 1 0-.777-.778l.778.778ZM9.056 7.722 12.39 4.39l-.778-.778-3.333 3.333.777.778Z"
          fill={color}
        />
      </svg>
    </IconContainer>
  )
}
