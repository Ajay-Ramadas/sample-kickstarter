import { Flow } from '../flow.model';

export interface ListingProps {
  stateHandler: (source: Flow, destination: Flow, component?: Flow) => void;
}
