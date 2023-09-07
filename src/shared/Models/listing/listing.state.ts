import { FlowsListType } from '../flow.model';

interface Filter {
  show: boolean;
  source?: string;
  destination?: string;
}

export interface ListingState {
  list: FlowsListType;
  expandedPanel: ExpansionPanel;
  dataFetchError?: boolean;
  filter: Filter;
}
interface ExpansionPanel {
  expanded: boolean;
  panelName: number;
}
