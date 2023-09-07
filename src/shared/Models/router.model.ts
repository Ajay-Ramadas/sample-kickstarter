export interface RouterDetails {
  routerFlowId: number;
  attribute: string;
  attributeValue: string;
  name: string;
}

export const getEmptyRouter = (): RouterDetails[] => {
  return [
    {
      routerFlowId: 1,
      attribute: '',
      attributeValue: '',
      name: ''
    },
    {
      routerFlowId: 2,
      attribute: '',
      attributeValue: '',
      name: ''
    }
  ];
};
