import { FlowsListType } from './flow.model';

export interface FlowListResponse {
  count: number;
  paginatedData: FlowsListType;
}
