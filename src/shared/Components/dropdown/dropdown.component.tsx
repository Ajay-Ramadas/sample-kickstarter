import { FormControl, InputLabel, MenuItem, Select, SxProps } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';
import { useEffect } from 'react';
import './dropdown.component.scss';

interface DropDownProps {
  id: string;
  label: string;
  dropDownChange: (currentValue: string) => void;
  currentValue: string;
  fullwidth: boolean;
  explicitStyle?: SxProps;
}

export default function Dropdown({
  id,
  label,
  dropDownChange,
  currentValue,
  fullwidth,
  explicitStyle
}: DropDownProps) {
  const selectId = String(id) + '-select';
  const [value, setValue] = React.useState(currentValue);
  useEffect(() => {
    setValue(currentValue);
  });

  const handleChange = (event: SelectChangeEvent<string>) => {
    setValue(event.target.value);
    dropDownChange(event.target.value);
  };

  const getSelectionList = (id: string) => {
    const sourceList = [
      <MenuItem value="Rest Endpoint" key={'Rest Endpoint'}>
        Rest Endpoint
      </MenuItem>,
      <MenuItem value="Database" key={'Database'}>
        Database
      </MenuItem>,
      <MenuItem value="Topic" key={'Topic'}>
        Topic
      </MenuItem>,
      <MenuItem value="Router" key={'Router'}>
        Router
      </MenuItem>
    ];
    const componentList = [
      <MenuItem value="Logs" key={'Logs'}>
        Logs
      </MenuItem>
    ];
    const destinationList = [
      <MenuItem value="Router" key={'Router'}>
        Router
      </MenuItem>,
      <MenuItem value="Database" key={'Database'}>
        Database
      </MenuItem>,
      <MenuItem value="Topic" key={'Topic'}>
        Topic
      </MenuItem>
    ];

    // Sub-Router
    const routerAttributesList = [
      <MenuItem value="requestType" key={'requestType'}>
        Request Type
      </MenuItem>,
      <MenuItem value="Attribute Type 2" key={'Attribute Type 2'}>
        Attribute Type 2
      </MenuItem>,
      <MenuItem value="Attribute Type 3" key={'Attribute Type 3'}>
        Attribute Type 3
      </MenuItem>
    ];

    const routerEndpointsList = [
      <MenuItem value="Topic" key={'Topic'}>
        Topic
      </MenuItem>,
      <MenuItem value="Endpoint Type 2" key={'Endpoint Type 2'}>
        Endpoint Type 2
      </MenuItem>,
      <MenuItem value="Endpoint Type 3" key={'Endpoint Type 3'}>
        Endpoint Type 3
      </MenuItem>
    ];

    switch (id) {
      case 'Source':
        return sourceList;
      case 'Destination':
        return destinationList;
      case 'Component':
        return componentList;
      case 'routerAttribute':
        return routerAttributesList;
      case 'routerEndpoint':
        return routerEndpointsList;
    }
  };

  return (
    <FormControl className={id + '-form'} fullWidth={fullwidth} sx={explicitStyle}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        variant="outlined"
        onChange={handleChange}
        labelId={id}
        label={label}
        id={selectId}
        value={value}
        fullWidth
        className={id}
      >
        {getSelectionList(id)}
      </Select>
    </FormControl>
  );
}
