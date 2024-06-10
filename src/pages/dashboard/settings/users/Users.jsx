import React from 'react'
import { users } from '../../../../data/data'
import { Box } from "@mui/material";
import AddIcon from "../../../../assets/svgs/settings/AddIcon";
import DownloadIcon from "../../../../assets/svgs/reports/DownloadIcon";
import UserCard from './components/UserCard';

const Users = () => {
  return (
    <>
      <Box
        sx={{
          background: "#F5F4F4",
          padding: {
            xs: "5px",
            md: "10px",
          },
          borderRadius: "24px",
        }}
      >
        <Box
          sx={{
            padding: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <AddIcon />
        </Box>
        <Box
          style={{
            marginTop: "50px",
            display: "flex",
            flexWrap: "wrap",
            columnGap: "1rem",
            rowGap: "4rem",
          }}
        >
          {users.map((user, i) => (
            <UserCard key={i} user={user} />
          ))}
        </Box>
      </Box>
    </>
  )
}

export default Users
