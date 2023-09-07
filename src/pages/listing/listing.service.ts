import { FlowsList } from '../../shared/Models/flow.model';
import { get } from '../../shared/Services/http.service';
import { getMockData } from '../../shared/Services/mock-http.service';

export const getFlowList = async (mock?: boolean): Promise<FlowsList> => {
  const url = 'getAllJson';
  const data = mock ? getMockData() : (await get(url)).data;

  return new Promise(resolve => {
    resolve({
      flowsList: data
    });
  });
};
