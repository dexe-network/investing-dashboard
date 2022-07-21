const cleanRouterParams = (routes: string[]) => {
  return routes.map((route) => (route[0] !== ":" ? route : ""))
}

const parseRouterParams = (path: string) => {
  const splitedPath = path.split("/")

  return cleanRouterParams(splitedPath)
}

const isActiveRoute = (path: string, source: string) => {
  if (path === source) return true

  const pathSplited = path.split("/")
  const sourceParsed = parseRouterParams(source)

  return sourceParsed.every((p, i) => p === pathSplited[i])
}

export default isActiveRoute
