import { SettingItem } from "./styled"

interface Props {
  title: string
  Right: any
}

const Item = (props: Props) => {
  return (
    <SettingItem>
      <p>{props.title}</p>
      <span>{props.Right}</span>
    </SettingItem>
  )
}
export default Item
