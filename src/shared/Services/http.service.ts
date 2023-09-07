import axios from 'axios';
import { Flows, FlowsListType } from '../Models/flow.model';
import { GenericResponse } from '../Models/generic-response.model';

const api = axios.create({
  baseURL: 'http://localhost:8082/'
});

export const post = (url: string, request?: Flows) => {
  return api.post<GenericResponse>(url, request);
};

export const get = (url: string, request?: never) => {
  return api.get<FlowsListType>(url, request);
};
