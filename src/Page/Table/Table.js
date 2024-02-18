import React, { useState, useEffect } from "react";
import "./Table.css"
import { Avatar, Box, Typography, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  let height = 600;
  if (isMobile) {
    height = 820;
  }
  const columns = [
    {
      field: "addImage",
      headerName: "Avatar",
      width: 120,
      renderCell: (params) => <Avatar src={params.row.addImage} />,
      sortable: false,
      filterable: false,
      headerClassName: "custom-header",
    },
    { field: "firstName", headerName: "First Name", width: 200,  headerClassName: "custom-header" },
    { field: "lastName", headerName: "Last Name", width: 160,  headerClassName: "custom-header", },
    { field: "phoneNumber", headerName: "Phone Number", width: 200,  headerClassName: "custom-header", },
    { field: "station", headerName: "Station", width: 160,  headerClassName: "custom-header", },
    { field: "district", headerName: "District", width: 160,  headerClassName: "custom-header", },
    { field: "gender", headerName: "Gender", width: 160,  headerClassName: "custom-header", },
    { field: "rankInChurch", headerName: "Rank", width: 180,  headerClassName: "custom-header", },
    { field: "yearTransferred", headerName: "Year Transferred", width: 160,  headerClassName: "custom-header", },
  ];

  const headerClassName = {
    root: "custom-header",
  };

  const onSubmit = async () => {
    try {
      const res = await axios.get(
        "https://christholychurch.onrender.com/api/getall"
      );

      setUsers(res?.data?.data2);
    } catch (err) {
      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <Box
      sx={{
        height: height,
        width: "100%",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        List of all Pastors
      </Typography>
      <DataGrid
        
        getRowId={(row) => row._id}
        columns={columns}
        rows={users}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      />
    </Box>
  );
};

export default Table;
