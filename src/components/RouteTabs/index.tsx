import { FC } from "react"
import { useLocation } from "react-router-dom"

import { ITab } from "constants/interfaces"
import isActiveRoute from "utils/isActiveRoute"

import S from "./styled"

interface IProps {
  tabs: ITab[]
}

const RouteTabs: FC<IProps> = ({ tabs }) => {
  const { pathname } = useLocation()

  return (
    <>
      <S.Tabs
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {tabs.map((tab, tabIndex) => (
          <S.Tab
            key={tabIndex}
            to={tab.source}
            active={isActiveRoute(pathname, tab.source)}
          >
            {tab.title}
            {Boolean(tab.amount) && <S.TabAmount>{tab.amount}</S.TabAmount>}
          </S.Tab>
        ))}
      </S.Tabs>
    </>
  )
}

export default RouteTabs
