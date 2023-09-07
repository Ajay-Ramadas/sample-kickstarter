import { EndpointType } from '../flow.model';
import { RouterDetails } from '../router.model';

export interface StateType {
  endpointType: EndpointType;
  connectionType: string;
  name: string;
  routers?: RouterDetails[];
}

export interface KickstarterState {
  sourceRows: StateType;
  componentRows: StateType;
  destinationRows: StateType;
  useStateInsteadOfProp: boolean;
  dialog?: { showDialog: boolean; success: boolean };
}
