const cleanRouterParams = (routes: string[]) => {
  return routes.map((route) => (route[0] !== ":" ? route : ""))
}

const parseRouterParams = (path: string) => {
  const splitedPath = path.split("/")

  return cleanRouterParams(splitedPath)
}

const isActiveRoute = (path: string, source: string) => {
  if (path === source) return true

  let isActive = false
  const pathSplited = path.split("/")

  const sourceParsed = parseRouterParams(source)

  sourceParsed.map((s, i) => {
    if (s === "") return

    if (s === pathSplited[i]) {
      isActive = true
    } else {
      isActive = false
    }
  })

  return isActive
}

export default isActiveRoute
