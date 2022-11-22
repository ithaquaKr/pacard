import "./library.scss";
import { DataGrid } from '@mui/x-data-grid';
// import { useContext, useEffect, useState } from "react";
import { useContext, useEffect } from "react";

import { SetContext } from "../../context/setContext/SetContext";
import { getAllSetsPublic } from "../../context/setContext/apiCalls";

// import { Document, Page,pdfjs } from 'react-pdf';

// Import info tab
import Infotab from "../../components/infotab/Infotab";

// Import Read tab
// import Readdocs from "../../components/readdocs/Readdocs";

export default function Library() {
  const { sets, dispatch } = useContext(SetContext);
  useEffect(() => {
    getAllSetsPublic(dispatch);
  }, [dispatch]);


  const columns = [
    {
      field: "title",
      headerName: "Tên bộ thẻ",
      headerAlign: 'center',
      width: 200,
      editable: true,
      sortable: true,
      filterable: true,
      renderCell: (params) => {
        return (
          <div className="documentListItem">
            {params.row.title}
          </div>
        );
      },
    },
    { field: "desc", headerName: "Mô tả", width: 250 ,editable: false,
    sortable: true,
    filterable: true,},
    { field: "classify", headerName: "Chủ đề", width: 180 ,editable: false,
    sortable: true,
    filterable: true,},
    // { field: "year", headerName: "Year", width: 80 ,editable: false,
    // sortable: true,
    // filterable: true,},
    { field: "uploadBy", headerName: "Người đăng", width: 100 ,editable: false,
    sortable: true,
    filterable: true,},

    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            {/*<Readdocs dataFromParent={params.row} />*/}
            <Infotab dataFromParent={params.row}/>
          </>
        );
      },
    },
  ];


  return (
    <div className="library-page">
      <div className="library-container">
        <div className="library-top">
        <img src="images/bg-left.png" alt="" className="library-img" />
          <div className="library-title">
            Library
          </div>
        </div>
        <div className="library-bottom">
          <div className="datatable-data">
            <DataGrid
              rows={sets}
              disableSelectionOnClick
              columns={columns}
              pageSize={15}
              // checkboxSelection
              rowsPerPageOptions={[5,10,15]}
              getRowId={(e) => e._id}
              // rowHeight={140}
              rowHeight={80}
              />
          </div>
        </div>
      </div>
    </div>
  );
}
