import { RouterDetails } from './router.model';

export interface Flow {
  flowId: number;
  endpoint: string;
  type: EndpointType;
  name?: string;
  routerFlows?: RouterDetails[];
}

export interface Flows {
  key: number; // Unique
  flows: Flow[];
  createdDate: string;
}

export type FlowsListType = Flows[];
export interface FlowsList {
  flowsList: FlowsListType;
}

export type EndpointType = 'source' | 'destination' | 'component';
