import { CustomPaging, PagingState } from "@devexpress/dx-react-grid";
import {
  Grid,
  PagingPanel,
  Table,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";
import { Paper } from "@mui/material";

import { Alert } from "../../types/AlertType";
import { ServerType } from "../../types/ServerType";
import PropTypes from "prop-types";

type AlertGridProps = {
  alerts: Alert[];
  currentPage: number;
  onCurrentPageChange: (page: number) => void;
  pageSize: number;
  totalCount: number;
};

const AlertGrid: React.FC<AlertGridProps> = ({
  alerts,
  currentPage,
  onCurrentPageChange,
  pageSize,
  totalCount,
}: AlertGridProps) => {
  const serverAlerts =
    alerts &&
    alerts.map((alert) => ({
      ...alert,
      server_type:
        alert.server_type === ServerType.ON_PREMISE ? "On Premise" : "Virtual",
    }));

  const columns =
    serverAlerts &&
    Object.keys(serverAlerts[0]).map((k) => ({
      name: k,
      id: k,
      title: k.toUpperCase().replace("_", " "),
    }));

  return (
    <Paper style={{ position: "relative" }}>
      <Grid rows={serverAlerts} columns={columns}>
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={onCurrentPageChange}
          pageSize={pageSize}
        />
        <CustomPaging totalCount={totalCount} />
        <Table />
        <TableHeaderRow />
        <PagingPanel />
      </Grid>
    </Paper>
  );
};

AlertGrid.propTypes = {
  alerts: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default AlertGrid;
