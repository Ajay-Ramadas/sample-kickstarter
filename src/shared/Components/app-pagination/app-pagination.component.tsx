import { Box, Pagination } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { getFlowList } from '../../../pages/listing/listing.service';
import { FlowsList, FlowsListType } from '../../Models/flow.model';
import Emitter from '../../Services/events.service';

const pageSize = 5;
interface PaginationProps {
  setFlows: (flows: FlowsListType) => void;
  filters?: { source?: string; destination?: string };
}

export default function AppPagination({ setFlows, filters }: PaginationProps) {
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize
  });

  const [data, setData] = useState<FlowsList>({ flowsList: [] });

  /* componentDidMount equivalent */
  useEffect(() => {
    getData();
    Emitter.on('REFRESH', () => {
      getData();
      handlePageChange(null, 1);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [filters.source, filters.destination]);

  useEffect(() => {
    sliceData(data, pagination.from, pagination.to);
  }, [pagination.from, pagination.to]);

  const getData = () => {
    getFlowList(false)
      .then((data: FlowsList) => {
        setData(data);
        sliceData(data, pagination.from, pagination.to);
        setTimeout(() => {
          Emitter.emit('DATA_FETCH_SUCCESS');
        }, 1000);
      })
      .catch(error => {
        console.log(error);
        setPagination({
          count: 0,
          from: 0,
          to: pageSize
        });
        setTimeout(() => {
          Emitter.emit('DATA_FETCH_ERROR');
        }, 1000);
      });
  };

  const sliceData = (currentData: FlowsList, from: number, to: number) => {
    currentData = filterData(currentData);
    const slicedData = currentData.flowsList.slice(from, to);
    setFlows(slicedData);
    setPagination({ ...pagination, count: currentData.flowsList.length });
  };

  const filterData = (data: FlowsList) => {
    console.log(data);
    if (filters?.source) {
      data.flowsList = data.flowsList.filter(flows => flows.flows[0].endpoint === filters.source);
    }
    if (filters?.destination) {
      data.flowsList = data.flowsList.filter(
        flows => flows.flows[1].endpoint === filters.destination
      );
    }
    return data;
  };

  const handlePageChange = (_event: unknown, page: number) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination({ ...pagination, from: from, to: to });
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '80%', mt: 4, mb: 4 }}>
        {pagination.count > pageSize ? (
          <Pagination
            onChange={handlePageChange}
            count={Math.ceil(pagination.count / pageSize)}
            variant="outlined"
            shape="rounded"
            size="medium"
          />
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
