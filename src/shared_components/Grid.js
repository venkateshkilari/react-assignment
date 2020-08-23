import React from "react";
import MUIDatatable from "mui-datatables";
import { CircularProgress, Typography } from "@material-ui/core";

export default function ({ title, columns, data, options, isLoading }) {
  return (
    <MUIDatatable
      title={
        <Typography variant="h6" style={{ textAlign: "left" }}>
          {title}
          {isLoading && (
            <CircularProgress
              size={24}
              style={{ marginLeft: 15, position: "relative", top: 4 }}
            />
          )}
        </Typography>
      }
      data={data}
      columns={columns}
      options={options}
    />
  );
}
