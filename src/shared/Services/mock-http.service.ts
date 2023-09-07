import { getSampleList } from '../../assets/mock/input-mock';
import { FlowsListType } from '../Models/flow.model';

export const getMockData = (): FlowsListType => {
  const mockData = getSampleList() as FlowsListType;
  return mockData;
};
