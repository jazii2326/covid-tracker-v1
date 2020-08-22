import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import QueueIcon from '@material-ui/icons/Queue';
import Search from '@material-ui/icons/Search';
import { lighten, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tableFont: {
      fontSize: 15,
    },
  }));

const Table = props => {
  const [gridData, setGridData] = useState({
    data: props.data,
    columns: props.col,
    resolve: () => {},
    updatedAt: new Date()
  });

  const classes = useStyles();



  useEffect(() => {
    gridData.resolve();
    console.log("RESOLVE AT:", gridData.updatedAt);
  }, [gridData]);


  return (
    <>
    {
      console.log(props.data)
    }
      <MaterialTable
        title="Reported Cases and Deaths by Country"
        columns={gridData.columns}
        data={props.data}

      />
    </>
  );
};

export default Table;
