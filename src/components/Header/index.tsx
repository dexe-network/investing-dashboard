import { StyledBar, TitleMenu, TabsMenu } from "components/TopMembersBar/styled"
import { usePoolsFilters } from "state/pools/hooks"
import { Tabs, Tab, Title, titleVariants } from "./styled"

interface ITab {
  title: string
  source: string
  amount: number
}

interface Props {
  title: string
  LeftComponent: any
  RightComponent: any
  tabs: ITab[]
  isTitleHidden?: boolean
}

const Header = ({
  LeftComponent,
  RightComponent,
  title,
  tabs,
  isTitleHidden,
}: Props) => {
  const [filters, dispatchFilter] = usePoolsFilters()
  return (
    <StyledBar
      initial={{ y: -102 }}
      animate={{ y: 0 }}
      exit={{ y: -102 }}
      transition={{ duration: 0.4, ease: [0.29, 0.98, 0.29, 1] }}
    >
      <TitleMenu>
        <LeftComponent />
        <Title
          initial="visible"
          animate={isTitleHidden ? "hidden" : "visible"}
          variants={titleVariants}
          transition={{ duration: 0.1, ease: [0.29, 0.98, 0.29, 1] }}
        >
          {title}
        </Title>
        <RightComponent />
      </TitleMenu>
      <TabsMenu>
        <Tabs>
          {tabs.map((tab: ITab) => {
            return (
              <Tab
                key={tab.title}
                active={filters.listType === tab.title}
                onClick={() => dispatchFilter("listType", tab.title)}
              >
                {tab.title}
              </Tab>
            )
          })}
        </Tabs>
      </TabsMenu>
    </StyledBar>
  )
}

export default Header
