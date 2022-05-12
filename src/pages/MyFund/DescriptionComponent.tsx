import { useRef, useState } from "react"
import { Flex } from "theme"
import pencil from "assets/icons/pencil.svg"
import {
  DescriptionHeader,
  DescriptionInput,
  DescriptionContainer,
  Icon,
} from "./styled"

interface Props {
  title: string
}

const DescriptionComponent = (props: Props) => {
  const [description, setDescription] = useState<string>("")
  const inputRef = useRef<any>(null)
  return (
    <DescriptionContainer dir="column" ai="flex-start">
      <Flex full>
        <DescriptionHeader>{props.title}</DescriptionHeader>
        <Flex>
          <DescriptionHeader>
            {1000 - description.length} symbol left
          </DescriptionHeader>
          <Icon src={pencil} />
        </Flex>
      </Flex>
      <DescriptionInput
        placeholder="Draft text add information for investors..."
        onInput={() => {
          if (inputRef.current) {
            inputRef.current.style.height = ""
            inputRef.current.style.height = inputRef.current.scrollHeight + "px"
          }
        }}
        ref={inputRef}
        value={description}
        onChange={(e) => setDescription(e.target.value.slice(0, 1000))}
      />
    </DescriptionContainer>
  )
}

export default DescriptionComponent
