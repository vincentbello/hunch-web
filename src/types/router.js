// @flow
export type RouterProps = {
  history: {
    push: (path: string) => void,
  },
  match: {
    isExact: boolean,
    params: {
      [key: string]: string,
    },
    path: string,
    url: string,
  }
};
