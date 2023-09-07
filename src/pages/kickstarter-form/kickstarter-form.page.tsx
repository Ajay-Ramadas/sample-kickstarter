import {
  CheckCircle,
  Delete,
  HighlightOff,
  RestartAlt,
  ThumbUpAltOutlined
} from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import Dropdown from '../../shared/Components/dropdown/dropdown.component';
import GenericDialog from '../../shared/Components/generic-dialog/generic-dialog.component';
import { clearAllButtonSX, clearButtonSX } from '../../shared/Models/common-styles.model';
import { EndpointType } from '../../shared/Models/flow.model';
import { KickstarterProps } from '../../shared/Models/kickstarter/kickstarter.props';
import { KickstarterState, StateType } from '../../shared/Models/kickstarter/kickstarter.state';
import { getEmptyRouter } from '../../shared/Models/router.model';
import Emitter from '../../shared/Services/events.service';
import { ACTIONS, reducer, ReducerPayload } from './kickstarter-form.reducer';
import './kickstarter-form.scss';
import { postData } from './kickstarter-form.service';

class KickstarterForm extends React.Component<KickstarterProps, KickstarterState> {
  constructor(props: KickstarterProps) {
    super(props);
    this.state = reducer(this.state, { type: ACTIONS.INIT });
  }

  static getDerivedStateFromProps(
    props: KickstarterProps,
    state: KickstarterState
  ): KickstarterState {
    return {
      sourceRows: {
        endpointType: 'source',
        connectionType: state.useStateInsteadOfProp
          ? state.sourceRows.connectionType
          : props?.source?.endpoint ?? '',
        name: state.useStateInsteadOfProp ? state.sourceRows.name : props?.source?.name ?? '',
        routers: state.useStateInsteadOfProp
          ? state.sourceRows.routers
          : props?.source?.routerFlows ?? getEmptyRouter()
      },
      componentRows: {
        endpointType: 'component',
        connectionType: state.useStateInsteadOfProp
          ? state.componentRows.connectionType
          : props?.component?.endpoint ?? '',
        name: state.useStateInsteadOfProp ? state.componentRows.name : props?.component?.name ?? ''
      },
      destinationRows: {
        endpointType: 'destination',
        connectionType: state.useStateInsteadOfProp
          ? state.destinationRows.connectionType
          : props?.destination?.endpoint ?? '',
        name: state.useStateInsteadOfProp
          ? state.destinationRows.name
          : props?.destination?.name ?? '',
        routers: state.useStateInsteadOfProp
          ? state.destinationRows.routers
          : props?.destination?.routerFlows ?? getEmptyRouter()
      },
      useStateInsteadOfProp: false
    };
  }

  callReducer = (actionType: ACTIONS, payload?: ReducerPayload) => {
    this.setState(reducer(this.state, { type: actionType, payload: payload }));
  };

  submitEnabled = (): boolean => {
    let submitEnabled = false;
    if (
      this.state.sourceRows.connectionType !== 'Router' &&
      this.state.destinationRows.connectionType !== 'Router'
    ) {
      submitEnabled =
        !!this.state.sourceRows.connectionType &&
        !!this.state.sourceRows.name &&
        !!this.state.destinationRows.connectionType &&
        !!this.state.destinationRows.name;
    } else {
      // TODO: Add Submit Validation for Router
      submitEnabled =
        !!this.state.sourceRows.connectionType && !!this.state.destinationRows.connectionType;
    }
    return submitEnabled;
  };

  dynamicConnectionTypeFieldsForRouter = (type: EndpointType): JSX.Element => {
    const stateType =
      type === 'source'
        ? this.state.sourceRows
        : type === 'destination'
        ? this.state.destinationRows
        : this.state.componentRows;
    if (stateType.connectionType === 'Router' && type !== 'component') {
      return (
        <>
          <div className="connection-type-dropdown">
            <Dropdown
              fullwidth={true}
              id="routerAttribute"
              label="Attribute Type 0"
              currentValue={stateType?.routers?.[0]?.attribute ?? ''}
              dropDownChange={attribute =>
                this.callReducer(
                  stateType.endpointType === 'source'
                    ? ACTIONS.UPDATE_SOURCE_ROUTER_ATTRIBUTE
                    : ACTIONS.UPDATE_DESTINATION_ROUTER_ATTRIBUTE,
                  { attribute: attribute, index: 0 }
                )
              }
            />
          </div>
          <div className="connection-type-dropdown">
            <Dropdown
              fullwidth={true}
              id="routerAttribute"
              label="Attribute Type 1"
              currentValue={stateType?.routers?.[1]?.attribute ?? ''}
              dropDownChange={attribute =>
                this.callReducer(
                  stateType.endpointType === 'source'
                    ? ACTIONS.UPDATE_SOURCE_ROUTER_ATTRIBUTE
                    : ACTIONS.UPDATE_DESTINATION_ROUTER_ATTRIBUTE,
                  { attribute: attribute, index: 1 }
                )
              }
            />
          </div>
        </>
      );
    } else {
      return this.connectionTypeFieldForNonRouter();
    }
  };
  connectionTypeFieldForNonRouter = () => {
    return <></>;
  };

  dynamicNameFieldsForRouter = (type: EndpointType): JSX.Element => {
    const stateType =
      type === 'source'
        ? this.state.sourceRows
        : type === 'destination'
        ? this.state.destinationRows
        : this.state.componentRows;
    if (stateType.connectionType === 'Router' && type !== 'component') {
      return (
        <>
          <div className="blank-top"></div>
          <div className="router-attribute">
            <TextField
              id="filled-basic"
              label="Keystone.source.0"
              variant="outlined"
              className="textbox"
              sx={{ m: 2, mt: 0 }}
              value={stateType.routers[0].attributeValue}
              onChange={event =>
                this.callReducer(
                  stateType.endpointType === 'source'
                    ? ACTIONS.UPDATE_SOURCE_ROUTER_ATTRIBUTE_VALUE
                    : ACTIONS.UPDATE_DESTINATION_ROUTER_ATTRIBUTE_VALUE,
                  { attributeValue: event.target.value, index: 0 }
                )
              }
            />
            <TextField
              id="filled-basic"
              label="Keystone.name.0"
              variant="outlined"
              className="textbox"
              sx={{ m: 2, mt: 0 }}
              value={stateType.routers[0].name}
              onChange={event =>
                this.callReducer(
                  stateType.endpointType === 'source'
                    ? ACTIONS.UPDATE_SOURCE_ROUTER_ATTRIBUTE_NAME
                    : ACTIONS.UPDATE_DESTINATION_ROUTER_ATTRIBUTE_NAME,
                  { attributeName: event.target.value, index: 0 }
                )
              }
            />
          </div>
          <div className="router-attribute">
            <TextField
              id="filled-basic"
              label="Keystone.source.1"
              variant="outlined"
              className="textbox"
              sx={{ m: 2, mt: 0 }}
              value={stateType.routers[1].attributeValue}
              onChange={event =>
                this.callReducer(
                  stateType.endpointType === 'source'
                    ? ACTIONS.UPDATE_SOURCE_ROUTER_ATTRIBUTE_VALUE
                    : ACTIONS.UPDATE_DESTINATION_ROUTER_ATTRIBUTE_VALUE,
                  { attributeValue: event.target.value, index: 1 }
                )
              }
            />
            <TextField
              id="filled-basic"
              label="Keystone.name.1"
              variant="outlined"
              className="textbox"
              sx={{ m: 2, mt: 0 }}
              value={stateType.routers[1].name}
              onChange={event =>
                this.callReducer(
                  stateType.endpointType === 'source'
                    ? ACTIONS.UPDATE_SOURCE_ROUTER_ATTRIBUTE_NAME
                    : ACTIONS.UPDATE_DESTINATION_ROUTER_ATTRIBUTE_NAME,
                  { attributeName: event.target.value, index: 1 }
                )
              }
            />
          </div>
        </>
      );
    } else {
      return this.nameFieldForNonRouterType(stateType);
    }
  };
  nameFieldForNonRouterType = (stateType: StateType) => {
    return (
      <TextField
        id="filled-basic"
        label="Keystone.source"
        variant="outlined"
        className="textbox"
        value={stateType.name}
        onChange={event =>
          this.callReducer(
            stateType.endpointType === 'source'
              ? ACTIONS.UPDATE_SOURCE_NAME
              : stateType.endpointType === 'component'
              ? ACTIONS.UPDATE_COMPONENT_NAME
              : ACTIONS.UPDATE_DESTINATION_NAME,
            { name: event.target.value }
          )
        }
      />
    );
  };

  submit = () => {
    postData(this.state.sourceRows, this.state.destinationRows, this.state.componentRows ?? null)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({ ...this.state, dialog: { showDialog: true, success: true } });
        } else {
          this.setState({ ...this.state, dialog: { showDialog: true, success: false } });
        }
      })
      .catch(reason => {
        console.log(reason);
        this.setState({ ...this.state, dialog: { showDialog: true, success: false } });
      });
  };

  dialog = () => {
    if (this.state?.dialog?.showDialog) {
      if (this.state?.dialog?.success) {
        return (
          <GenericDialog
            content="Submit Successfull! Click OK to return to Listing Page"
            title="Success"
            primaryActionButton={{ verbiage: 'OK', endIcon: <ThumbUpAltOutlined /> }}
            callback={this.showListing}
            success={true}
          />
        );
      } else
        return (
          <GenericDialog
            content="Submit Failed! Please try again."
            title="Failure"
            callback={this.dismissDialog}
            success={false}
            primaryActionButton={{ verbiage: 'Try Again', endIcon: <RestartAlt /> }}
          />
        );
    } else {
      return <></>;
    }
  };
  dismissDialog = () => {
    this.setState({ ...this.state, dialog: { showDialog: false, success: false } });
  };
  showListing = () => {
    Emitter.emit('CHANGE_TAB', 0);
    this.dismissDialog();
  };

  render(): React.ReactNode {
    return (
      <>
        <TableContainer component={Paper}>
          <Table aria-label="simple table" className="table">
            <TableHead className="th">
              <TableRow className="tr">
                <TableCell className="td" align="center">
                  Endpoint Type
                </TableCell>
                <TableCell className="td" align="center">
                  Connection Type
                </TableCell>
                <TableCell className="td" align="center">
                  Name
                </TableCell>
                <TableCell className="td" align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="tb">
              <TableRow className="tr">
                <TableCell className="td" align="center">
                  <strong>Source*</strong>
                </TableCell>
                <TableCell className="td" align="center">
                  <div className="connection-type-dropdown">
                    <Dropdown
                      fullwidth={true}
                      id="Source"
                      label="Choose Source"
                      currentValue={this.state.sourceRows.connectionType}
                      dropDownChange={connectionType =>
                        this.callReducer(ACTIONS.UPDATE_SOURCE_CONNECTION, {
                          connectionType: connectionType
                        })
                      }
                    />
                  </div>
                  {this.dynamicConnectionTypeFieldsForRouter('source')}
                </TableCell>
                <TableCell className="td" align="center" sx={{ width: '35em' }}>
                  {this.dynamicNameFieldsForRouter('source')}
                </TableCell>
                <TableCell className="td" align="center">
                  <IconButton
                    onClick={() => this.callReducer(ACTIONS.CLEAR_SOURCE)}
                    sx={clearButtonSX}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>

              <TableRow className="tr">
                <TableCell className="td" align="center">
                  <strong>Component</strong>
                </TableCell>
                <TableCell className="td" align="center">
                  <div className="connection-type-dropdown">
                    <Dropdown
                      fullwidth={true}
                      id="Component"
                      label="Choose Component"
                      currentValue={this.state.componentRows.connectionType}
                      dropDownChange={connectionType =>
                        this.callReducer(ACTIONS.UPDATE_COMPONENT_CONNECTION, {
                          connectionType: connectionType
                        })
                      }
                    />
                  </div>
                </TableCell>
                <TableCell className="td" align="center" sx={{ width: '35em' }}>
                  {this.dynamicNameFieldsForRouter('component')}
                </TableCell>
                <TableCell className="td" align="center">
                  <IconButton
                    sx={clearButtonSX}
                    onClick={() => this.callReducer(ACTIONS.CLEAR_COMPONENT)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>

              <TableRow className="tr">
                <TableCell className="td" align="center">
                  <strong>Destination*</strong>
                </TableCell>
                <TableCell className="td" align="center">
                  <div className="connection-type-dropdown">
                    <Dropdown
                      fullwidth={true}
                      id="Destination"
                      label="Choose Destination"
                      currentValue={this.state.destinationRows.connectionType}
                      dropDownChange={connectionType =>
                        this.callReducer(ACTIONS.UPDATE_DESTINATION_CONNECTION, {
                          connectionType: connectionType
                        })
                      }
                    />
                  </div>
                  {this.dynamicConnectionTypeFieldsForRouter('destination')}
                </TableCell>
                <TableCell className="td" align="center" sx={{ width: '35em' }}>
                  {this.dynamicNameFieldsForRouter('destination')}
                </TableCell>
                <TableCell className="td" align="center">
                  <IconButton
                    sx={clearButtonSX}
                    onClick={() => this.callReducer(ACTIONS.CLEAR_DESTINATION)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="submit-container">
            <Button
              sx={clearAllButtonSX}
              variant="outlined"
              onClick={() => this.clearAll()}
              endIcon={<HighlightOff />}
            >
              Clear All
            </Button>
            <Button
              sx={{ m: 2 }}
              variant="contained"
              disabled={!this.submitEnabled()}
              onClick={() => this.submit()}
              endIcon={<CheckCircle />}
            >
              Submit
            </Button>
          </div>
        </TableContainer>
        {this.dialog()}
      </>
    );
  }

  clearAll = () => {
    this.callReducer(ACTIONS.CLEAR_ALL);
  };
}

export default KickstarterForm;
