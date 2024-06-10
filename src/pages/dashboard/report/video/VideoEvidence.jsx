import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import DownloadIcon from "../../../../assets/svgs/reports/DownloadIcon";
import LocationIcon from "../../../../assets/svgs/home/LocationIcon";
import VideoRecordIcon from "../../../../assets/svgs/home/VideoRecordIcon";
import PlayIcon from "../../../../assets/svgs/home/PlayIcon";

const rows = [
  {
    id: 1,
    alertId: "i500500008658470",
    alertType: "SD Card removal",
    fleetNumber: "500049",
    plateNumber: "6752RBB",
    driverName: "Alice Smith",
    date: "01/14/2024 - 02:31",
    severity: 'High',
    status: "Unacknowledged",
    actions: "34.052235",
  },
  {
    id: 3,
    alertId: "i500500008658470",
    alertType: "SD Card removal",
    fleetNumber: "500049",
    plateNumber: "6752RBB",
    driverName: "Alice Smith",
    date: "01/14/2024 - 02:31",
    severity: 'High',
    status: "Unacknowledged",
    actions: "34.052235",
  },
  {
    id: 4,
    alertId: "i500500008658470",
    alertType: "SD Card removal",
    fleetNumber: "500049",
    plateNumber: "6752RBB",
    driverName: "Alice Smith",
    date: "01/14/2024 - 02:31",
    severity: 'High',
    status: "Unacknowledged",
    actions: "34.052235",
  },
  {
    id: 5,
    alertId: "i500500008658470",
    alertType: "SD Card removal",
    fleetNumber: "500049",
    plateNumber: "6752RBB",
    driverName: "Alice Smith",
    date: "01/14/2024 - 02:31",
    severity: 'High',
    status: "Unacknowledged",
    actions: "34.052235",
  },
  {
    id: 6,
    alertId: "i500500008658470",
    alertType: "SD Card removal",
    fleetNumber: "500049",
    plateNumber: "6752RBB",
    driverName: "Alice Smith",
    date: "01/14/2024 - 02:31",
    severity: 'High',
    status: "Unacknowledged",
    actions: "34.052235",
  },
  {
    id: 7,
    alertId: "i500500008658470",
    alertType: "SD Card removal",
    fleetNumber: "500049",
    plateNumber: "6752RBB",
    driverName: "Alice Smith",
    date: "01/14/2024 - 02:31",
    severity: 'High',
    status: "Unacknowledged",
    actions: "34.052235",
  },
];

const columns = [
  { field: "alertId", headerName: "ALERT ID", width: 180 },
  { field: "alertType", headerName: "ALERT TYPE", width: 130 },
  { field: "fleetNumber", headerName: "FLEET NUMBER", width: 150 },
  { field: "plateNumber", headerName: "PLATE NUMBER", width: 150 },
  { field: "driverName", headerName: "DRIVER NAME", width: 150 },
  { field: "date", headerName: "DATE/TIME", width: 160 },
  { 
    field: "severity", 
    headerName: "SEVERITY", 
    width: 150,
    renderCell: (params) => (
      <Box sx={{
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%'
      }}>
        <Box sx={{
          background: '#ff6554',
          borderRadius: '8px',
          color: '#fff',
          height: '42px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}>
          {params.value}
        </Box>
      </Box>
    )
  },
  { 
    field: "actions", 
    headerName: "ACTIONS", 
    width: 150,
    renderCell: () => (
      <Box sx={{ 
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
       }}>
        <Box sx={{ cursor: 'pointer' }}>
          <LocationIcon />
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <VideoRecordIcon />
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <PlayIcon />
        </Box>
      </Box>
    )
  },
];

const VideoEvidence = () => {
  return (
    <Box
      sx={{
        width: "100%",
        background: "#ffffff",
        borderRadius: "24px 24px 0 0",
        marginTop: "-3.5rem",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "16px",
        }}
      >
        <DownloadIcon />
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        sx={{
          "& .MuiDataGrid-row.even-row": {
            backgroundColor: "#fafafa",
          },
          "& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitle": {
            fontSize: {
              xs: "14px",
              md: "16px",
            },
            fontWeight: 600,
            color: "#111111",
          },
          "& .MuiDataGrid-row .MuiDataGrid-cell": {
            fontSize: {
              xs: "14px",
              md: "16px",
            },
            background: "#fafafa",
            fontWeight: 400,
            color: "rgba(17, 17, 17, 0.6)",
          },
          "& .MuiDataGrid-root": {
            borderTopLeftRadius: "24px !important",
            borderTopRightRadius: "24px !important",
            border: "0 !important",
            overflow: "hidden",
            width: "100%",
          },
          "& .MuiDataGrid-main": {
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
            width: "100%",
            padding: "0 10px",
          },
          "& .MuiDataGrid-overlay": {
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
          },
          "& .MuiDataGrid-footerContainer": {
            display: "none",
          },
          "& .MuiDataGrid-scrollbar": {
            "&::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#00193333",
              borderRadius: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#006bce",
              borderRadius: "10px",
            },
          },
        }}
      />
    </Box>
  );
};

export default VideoEvidence;