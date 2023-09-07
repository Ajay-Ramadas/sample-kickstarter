import {
  ErrorOutlineRounded,
  ExpandMore,
  FilterAlt,
  FilterAltOutlined,
  HighlightOff,
  Refresh,
  Send
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  SxProps,
  Typography
} from '@mui/material';
import * as React from 'react';
import AppPagination from '../../shared/Components/app-pagination/app-pagination.component';
import Dropdown from '../../shared/Components/dropdown/dropdown.component';
import { clearAllButtonSX } from '../../shared/Models/common-styles.model';
import { EndpointType, Flow, Flows, FlowsListType } from '../../shared/Models/flow.model';
import { ListingProps } from '../../shared/Models/listing/listing.props';
import { ListingState } from '../../shared/Models/listing/listing.state';
import Emitter from '../../shared/Services/events.service';
import './listing.page.scss';

class Listing extends React.Component<ListingProps, ListingState> {
  constructor(props: ListingProps) {
    super(props);
    this.state = {
      list: [],
      expandedPanel: { expanded: false, panelName: -1 },
      dataFetchError: false,
      filter: { show: false }
    };
    Emitter.on('DATA_FETCH_ERROR', () => {
      this.setState({ ...this.state, dataFetchError: true });
    });
    Emitter.on('DATA_FETCH_SUCCESS', () => {
      this.setState({ ...this.state, dataFetchError: false });
    });
  }

  handleChange = (panel: number) => (_event: unknown, isExpanded: boolean) => {
    Object.assign(
      this.state.expandedPanel,
      isExpanded ? { expanded: true, panelName: panel } : { expanded: false, panelName: -1 }
    );
    this.setState(this.state);
  };

  getFlow = (flows: Flows, type: EndpointType) =>
    flows.flows.find(flow => (flow.type.toLowerCase() as EndpointType) === type);

  editDetails = (flows: Flows) => {
    this.props.stateHandler(
      this.getFlow(flows, 'source'),
      this.getFlow(flows, 'destination'),
      this.getFlow(flows, 'component')
    );
  };

  populateList = () => {
    if (this.state.list.length) {
      return this.state.list.map((flows, index) => {
        return (
          <MenuItem key={index} disableRipple disableGutters>
            <Box sx={{ width: '80%' }}>
              <Accordion
                expanded={this.state.expandedPanel.panelName === index}
                onChange={this.handleChange(index)}
                sx={{
                  width: '100%'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    <strong>Source:</strong> {this.getFlow(flows, 'source').name ?? 'Router Type'}
                  </Typography>
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    <strong>Destination:</strong>{' '}
                    {this.getFlow(flows, 'destination').name ?? 'Router Type'}
                  </Typography>
                  {flows.flows.some(flow => flow.type === 'component') ? (
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      <strong>Component:</strong> {this.getFlow(flows, 'component').name}
                    </Typography>
                  ) : (
                    <></>
                  )}
                </AccordionSummary>
                <AccordionDetails>{this.getAccordionDetailCards(flows)}</AccordionDetails>
              </Accordion>
            </Box>
            <Box sx={{ width: '20%' }}>
              <Button
                endIcon={<Send />}
                onClick={() => this.editDetails(flows)}
                color="secondary"
                variant="contained"
                sx={{
                  mr: 2,
                  display: { xs: 'flex' },
                  ml: 'auto'
                }}
              >
                Edit
              </Button>
            </Box>
          </MenuItem>
        );
      });
    }
  };

  getAccordionDetailCards = (flows: Flows) => {
    return (
      <Stack direction="row">
        <Card
          sx={{ width: '30%', maxHeight: '200px', overflow: 'auto', mr: 2 }}
          variant="outlined"
          key={'Source Card'}
        >
          <CardContent>
            <Typography sx={{ fontSize: 14, fontWeight: '700' }} color="text.primary" gutterBottom>
              Type:
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {this.getFlow(flows, 'source').endpoint}
            </Typography>
            {this.getFlow(flows, 'source').endpoint === 'Router' ? (
              this.getRouterAccordionDetails(this.getFlow(flows, 'source'))
            ) : (
              <Typography
                sx={{ fontSize: 14, fontWeight: '700' }}
                color="text.primary"
                gutterBottom
              >
                Name:
              </Typography>
            )}
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {this.getFlow(flows, 'source').name}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{ width: '30%', maxHeight: '200px', overflow: 'auto', mr: 2 }}
          variant="outlined"
          key={'Destination Card'}
        >
          <CardContent>
            <Typography sx={{ fontSize: 14, fontWeight: '700' }} color="text.primary" gutterBottom>
              Type:
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {this.getFlow(flows, 'destination').endpoint}
            </Typography>
            {this.getFlow(flows, 'destination').endpoint === 'Router' ? (
              this.getRouterAccordionDetails(this.getFlow(flows, 'destination'))
            ) : (
              <Typography
                sx={{ fontSize: 14, fontWeight: '700' }}
                color="text.primary"
                gutterBottom
              >
                Name:
              </Typography>
            )}
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {this.getFlow(flows, 'destination').name}
            </Typography>
          </CardContent>
        </Card>

        {/* Component Card */}
        {this.getFlow(flows, 'component')?.flowId >= 0 ? (
          <Card sx={{ width: '30%', maxHeight: '200px', overflow: 'auto' }} variant="outlined">
            <CardContent>
              <Typography
                sx={{ fontSize: 14, fontWeight: '700' }}
                color="text.primary"
                gutterBottom
              >
                Type:
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {this.getFlow(flows, 'component').endpoint}
              </Typography>
              <Typography
                sx={{ fontSize: 14, fontWeight: '700' }}
                color="text.primary"
                gutterBottom
              >
                Name:
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {this.getFlow(flows, 'component').name}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <></>
        )}
      </Stack>
    );
  };
  getRouterAccordionDetails = (flow: Flow) => {
    return flow.routerFlows.map(routerFlow => {
      return (
        <div key={routerFlow.routerFlowId}>
          <Typography
            sx={{ fontSize: 14, fontWeight: '700', mt: 2 }}
            color="text.primary"
            gutterBottom
          >
            Router Flow {routerFlow.routerFlowId}
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: '700' }} color="text.primary" gutterBottom>
            Attribute:
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {routerFlow.attribute}
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: '700' }} color="text.primary" gutterBottom>
            Attribute Value:
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {routerFlow.attributeValue}
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: '700' }} color="text.primary" gutterBottom>
            Attribute Name:
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {routerFlow.name}
          </Typography>
        </div>
      );
    });
  };

  refresh() {
    this.setState({
      list: [],
      expandedPanel: { expanded: false, panelName: -1 },
      dataFetchError: false,
      filter: {
        show: false
      }
    });
    Emitter.emit('REFRESH');
  }

  filters = () => {
    const filterDropdown: SxProps = {
      width: '20%',
      marginRight: 2
    };
    // const buttonsDisabled =
    //   this.state.filter?.source || this.state.filter?.destination ? false : true;
    return this.state.filter.show ? (
      <Box sx={{ display: 'flex', margin: 2 }}>
        <Dropdown
          fullwidth={false}
          explicitStyle={filterDropdown}
          id="Source"
          label="Source"
          currentValue={this.state.filter?.source ?? ''}
          dropDownChange={currentValue => {
            this.setState({
              ...this.state,
              filter: { ...this.state.filter, source: currentValue }
            });
          }}
        />
        <Dropdown
          fullwidth={false}
          explicitStyle={filterDropdown}
          id="Destination"
          label="Destination"
          currentValue={this.state.filter?.destination ?? ''}
          dropDownChange={currentValue => {
            this.setState({
              ...this.state,
              filter: { ...this.state.filter, destination: currentValue }
            });
          }}
        />
        <Button
          sx={clearAllButtonSX}
          variant="outlined"
          onClick={() =>
            this.setState({
              ...this.state,
              filter: { ...this.state.filter, destination: '', source: '' }
            })
          }
          endIcon={<HighlightOff />}
        >
          Clear
        </Button>
        {/* <Button
          sx={{ m: 2 }}
          variant="contained"
          onClick={() => filter()}
          endIcon={<CheckCircle />}
          disabled={buttonsDisabled}
        >
          Add
        </Button> */}
      </Box>
    ) : (
      <></>
    );
  };

  //#region
  contentUnavailable() {
    if (!this.state?.list.length && !this.state?.dataFetchError && !this.state?.filter?.show) {
      const arrayOf5 = [1, 2, 3, 4, 5];
      const skeletonList = () => {
        return arrayOf5.map(number => {
          return (
            <React.Fragment key={number}>
              <Grid justifySelf={'left'}>
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 1, mr: 20, height: '2.5rem', width: '62.5rem' }}
                />
              </Grid>
              <Grid justifySelf={'right'}>
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 1, mr: 2, height: '2.5rem', width: '5rem' }}
                />
              </Grid>
            </React.Fragment>
          );
        });
      };
      return (
        <Grid container justifyContent={'space-between'}>
          {skeletonList()}
        </Grid>
      );
    } else if (!this.state?.list.length && this.state?.dataFetchError) {
      return (
        <Card variant="elevation">
          <CardContent>
            <Typography>
              <ErrorOutlineRounded color="error" sx={{ mr: 2 }} />
              Unable To Fetch Latest Data. Please try after some time.
            </Typography>
          </CardContent>
        </Card>
      );
    } else if (!this.state?.list.length && this.state.filter?.show) {
      return (
        <Card variant="elevation">
          <CardContent>
            <Typography>
              <ErrorOutlineRounded color="warning" sx={{ mr: 2 }} />
              No data available with current filters. Please remove filters and try again.
            </Typography>
          </CardContent>
        </Card>
      );
    }
  }
  //#endregion

  render(): React.ReactNode {
    return (
      <>
        <Box sx={{ display: 'flex' }}>
          <Button
            endIcon={<Refresh />}
            onClick={() => this.refresh()}
            color="secondary"
            variant="contained"
            sx={{ align: 'flex-start', margin: 1 }}
          >
            Refresh
          </Button>
          <Button
            endIcon={this.state.filter?.show ? <FilterAlt /> : <FilterAltOutlined />}
            onClick={() =>
              this.setState({ ...this.state, filter: { show: !this.state.filter.show } })
            }
            color="secondary"
            variant="outlined"
            sx={{ align: 'flex-start', margin: 1 }}
          >
            Filter
          </Button>
        </Box>
        {this.filters()}
        <MenuList>{this.populateList()}</MenuList>

        {this.contentUnavailable()}

        <AppPagination
          filters={{
            source: this.state.filter?.source ?? '',
            destination: this.state.filter?.destination ?? ''
          }}
          setFlows={(flows: FlowsListType) => this.setState({ ...this.state, list: flows })}
        />
      </>
    );
  }
}

export default Listing;
