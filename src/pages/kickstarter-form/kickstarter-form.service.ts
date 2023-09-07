import { Flow, Flows } from '../../shared/Models/flow.model';
import { StateType } from '../../shared/Models/kickstarter/kickstarter.state';
import { post } from '../../shared/Services/http.service';

type KickstarterStateType = Partial<StateType>;

export const postData = async (
  {
    endpointType: sourceEndpoint,
    connectionType: sourceConnection,
    name: sourceName,
    routers: sourceRouterDetails
  }: KickstarterStateType,
  {
    endpointType: destinationEndpoint,
    connectionType: destinationConnection,
    name: destinationName,
    routers: destinationRouterDetails
  }: KickstarterStateType,
  {
    endpointType: componentEndpoint,
    connectionType: componentConnection,
    name: componentName
  }: KickstarterStateType
) => {
  // const headers = new Headers({});
  const url = 'build-flow';

  let id = 1;
  const request: Flows = {
    flows: [],
    key: null,
    createdDate: ''
  };
  let sourceFlow: Flow = {
    flowId: id++,
    endpoint: sourceConnection,
    type: sourceEndpoint
  };
  if (sourceFlow.endpoint === 'Router') {
    sourceFlow = { ...sourceFlow, routerFlows: sourceRouterDetails };
  } else {
    sourceFlow = { ...sourceFlow, name: sourceName };
  }

  let destinationFlow: Flow = {
    flowId: id++,
    endpoint: destinationConnection,
    type: destinationEndpoint
  };
  if (destinationFlow.endpoint === 'Router') {
    destinationFlow = { ...destinationFlow, routerFlows: destinationRouterDetails };
  } else {
    destinationFlow = { ...destinationFlow, name: destinationName };
  }

  request.flows.push(sourceFlow, destinationFlow);
  if (componentName) {
    const componentFlow: Flow = {
      flowId: id++,
      endpoint: componentConnection,
      type: componentEndpoint,
      name: componentName
    };
    request.flows.push(componentFlow);
  }

  console.log(request);

  return post(url, request);
};
