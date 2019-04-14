// @flow
export type RouterProps = {
  match: {
    isExact: boolean,
    params: {
      [key: string]: string,
    },
    path: string,
    url: string,
  }
};
