import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import MaterialTable from 'material-table';
import { addWorkOrder, deleteWorkOrder, editWorkOrder, initWorkOrders } from '../cache/actions';
import {useSelector, useDispatch} from 'react-redux';
import {sendGET, sendDELETE, sendEDIT, sendPOST} from './lib/fetchRequests'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});
  

const WorkOrderPage = () => {

    return (
        <>
            <Grid container style={{padding: "30px"}}spacing={3}>
                <Grid item xs={2}/>{/*Thes added Grid items are used to center the other components*/}
                                   {/*xs has a max length of 12. It is a part of the grid sizing*/}
                <Grid item xs={8}> {/*Check this link to learn more: https://material-ui.com/components/grid/*/}
                    <WorkOrderTable />
                </Grid>
            </Grid>
        </>
    )
}

export default WorkOrderPage 


function WorkOrderTable() {
    const classes = useStyles();
    const workOrderData = useSelector(state => state.orderReducer)
    const userInfo = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const url = `http://localhost:5000/work-orders/${userInfo.userId}`
    const [state, setState] = React.useState({
        columns: [],
        data: []
    });

    useEffect(() => {
        // Send a GET request to a server. Using a function allows for easy reusability.
        sendGET(url, dispatch, userInfo, initWorkOrders)
    }, [])

    const deleteOrder = (orderId) => {
        sendDELETE(url, dispatch, orderId, userInfo, deleteWorkOrder)
    }

    const editOrder = (order) => {
        sendEDIT(order, url, dispatch, userInfo, editWorkOrder)
    }

    const addOrder = (order) => {
        sendPOST(order, url, dispatch, userInfo, addWorkOrder)
    }

    useEffect(() => {
        // Set the column and data for MaterialTable
        setState({columns: [{ title: 'Title', field: 'title' },
                            { title: 'Content', field: 'content' },], 
                  data: workOrderData})
    }, [workOrderData])


  return (
    <MaterialTable
      title="Work Orders"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                addOrder(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  editOrder(newData);
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                deleteOrder(oldData.orderId);
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}