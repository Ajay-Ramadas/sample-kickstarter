import { KickstarterState } from '../../shared/Models/kickstarter/kickstarter.state';
import { getEmptyRouter } from '../../shared/Models/router.model';

export enum ACTIONS {
  // Default
  INIT,
  CLEAR_ALL,

  // Source Actions
  CLEAR_SOURCE,
  UPDATE_SOURCE_CONNECTION,
  UPDATE_SOURCE_NAME,
  UPDATE_SOURCE_ROUTER_ATTRIBUTE,
  UPDATE_SOURCE_ROUTER_ATTRIBUTE_VALUE,
  UPDATE_SOURCE_ROUTER_ATTRIBUTE_NAME,

  // Component Actions
  CLEAR_COMPONENT,
  UPDATE_COMPONENT_CONNECTION,
  UPDATE_COMPONENT_NAME,

  // Destination Actions
  CLEAR_DESTINATION,
  UPDATE_DESTINATION_CONNECTION,
  UPDATE_DESTINATION_NAME,
  UPDATE_DESTINATION_ROUTER_ATTRIBUTE,
  UPDATE_DESTINATION_ROUTER_ATTRIBUTE_VALUE,
  UPDATE_DESTINATION_ROUTER_ATTRIBUTE_NAME
}

export interface ReducerPayload {
  connectionType?: string;
  name?: string;

  // Router Specific
  attribute?: string;
  attributeValue?: string;
  attributeName?: string;
  index?: number;
}

interface ReducerAction {
  type: ACTIONS;
  payload?: ReducerPayload;
}

export const reducer = (state: KickstarterState, action: ReducerAction): KickstarterState => {
  switch (action.type) {
    case ACTIONS.INIT:
      return {
        sourceRows: {
          endpointType: 'source',
          connectionType: '',
          name: '',
          routers: getEmptyRouter()
        },
        componentRows: {
          endpointType: 'component',
          connectionType: '',
          name: ''
        },
        destinationRows: {
          endpointType: 'destination',
          connectionType: '',
          name: '',
          routers: getEmptyRouter()
        },
        useStateInsteadOfProp: false
      };
    case ACTIONS.CLEAR_ALL:
      return {
        sourceRows: {
          endpointType: 'source',
          connectionType: '',
          name: '',
          routers: getEmptyRouter()
        },
        componentRows: {
          endpointType: 'component',
          connectionType: '',
          name: ''
        },
        destinationRows: {
          endpointType: 'destination',
          connectionType: '',
          name: '',
          routers: getEmptyRouter()
        },
        useStateInsteadOfProp: true
      };

    // Source Actions
    case ACTIONS.CLEAR_SOURCE:
      return {
        ...state,
        sourceRows: {
          endpointType: 'source',
          connectionType: '',
          name: '',
          routers: getEmptyRouter()
        },
        useStateInsteadOfProp: true
      };
    case ACTIONS.UPDATE_SOURCE_CONNECTION:
      return {
        ...state,
        sourceRows: { ...state.sourceRows, connectionType: action.payload.connectionType },
        useStateInsteadOfProp: true
      };
    case ACTIONS.UPDATE_SOURCE_NAME:
      return {
        ...state,
        sourceRows: { ...state.sourceRows, name: action.payload.name },
        useStateInsteadOfProp: true
      };
    case ACTIONS.UPDATE_SOURCE_ROUTER_ATTRIBUTE_NAME:
      return {
        ...state,
        sourceRows: {
          ...state.sourceRows,
          routers: state.sourceRows.routers.map((routerFlow, index) => {
            if (index === action.payload.index) {
              routerFlow.name = action.payload.attributeName;
            }
            return routerFlow;
          })
        },
        useStateInsteadOfProp: true
      };
    case ACTIONS.UPDATE_SOURCE_ROUTER_ATTRIBUTE:
      return {
        ...state,
        sourceRows: {
          ...state.sourceRows,
          routers: state.sourceRows.routers.map((routerFlow, index) => {
            if (index === action.payload.index) {
              routerFlow.attribute = action.payload.attribute;
            }
            return routerFlow;
          })
        },
        useStateInsteadOfProp: true
      };
    case ACTIONS.UPDATE_SOURCE_ROUTER_ATTRIBUTE_VALUE:
      return {
        ...state,
        sourceRows: {
          ...state.sourceRows,
          routers: state.sourceRows.routers.map((routerFlow, index) => {
            if (index === action.payload.index) {
              routerFlow.attributeValue = action.payload.attributeValue;
            }
            return routerFlow;
          })
        },
        useStateInsteadOfProp: true
      };

    // Component Actions
    case ACTIONS.CLEAR_COMPONENT:
      return {
        ...state,
        componentRows: {
          endpointType: 'component',
          connectionType: '',
          name: ''
        },
        useStateInsteadOfProp: true
      };
    case ACTIONS.UPDATE_COMPONENT_CONNECTION:
      return {
        ...state,
        componentRows: { ...state.componentRows, connectionType: action.payload.connectionType },
        useStateInsteadOfProp: true
      };
    case ACTIONS.UPDATE_COMPONENT_NAME:
      return {
        ...state,
        componentRows: { ...state.componentRows, name: action.payload.name },
        useStateInsteadOfProp: true
      };

    // Destination Actions
    case ACTIONS.CLEAR_DESTINATION:
      return {
        ...state,
        destinationRows: {
          endpointType: 'destination',
          connectionType: '',
          name: '',
          routers: getEmptyRouter()
        },
        useStateInsteadOfProp: true
      };
    case ACTIONS.UPDATE_DESTINATION_CONNECTION:
      return {
        ...state,
        destinationRows: {
          ...state.destinationRows,
          connectionType: action.payload.connectionType
        },
        useStateInsteadOfProp: true
      };
    case ACTIONS.UPDATE_DESTINATION_NAME:
      return {
        ...state,
        destinationRows: { ...state.destinationRows, name: action.payload.name },
        useStateInsteadOfProp: true
      };
    case ACTIONS.UPDATE_DESTINATION_ROUTER_ATTRIBUTE_NAME:
      return {
        ...state,
        destinationRows: {
          ...state.destinationRows,
          routers: state.destinationRows.routers.map((routerFlow, index) => {
            if (index === action.payload.index) {
              routerFlow.name = action.payload.attributeName;
            }
            return routerFlow;
          })
        },
        useStateInsteadOfProp: true
      };
    case ACTIONS.UPDATE_DESTINATION_ROUTER_ATTRIBUTE:
      return {
        ...state,
        destinationRows: {
          ...state.destinationRows,
          routers: state.destinationRows.routers.map((routerFlow, index) => {
            if (index === action.payload.index) {
              routerFlow.attribute = action.payload.attribute;
            }
            return routerFlow;
          })
        },
        useStateInsteadOfProp: true
      };
    case ACTIONS.UPDATE_DESTINATION_ROUTER_ATTRIBUTE_VALUE:
      return {
        ...state,
        destinationRows: {
          ...state.destinationRows,
          routers: state.destinationRows.routers.map((routerFlow, index) => {
            if (index === action.payload.index) {
              routerFlow.attributeValue = action.payload.attributeValue;
            }
            return routerFlow;
          })
        },
        useStateInsteadOfProp: true
      };
  }
};
