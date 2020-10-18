export interface Route {
  path: string,
  exact: boolean,
  page: () => JSX.Element
}