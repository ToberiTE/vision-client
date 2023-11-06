import { useCallback, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MaterialReactTableProps,
  MRT_Row,
  type MRT_ColumnDef,
} from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import CloseIcon from "@mui/icons-material/Close";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { Delete, Edit } from "@mui/icons-material";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

type Transaction = {
  id: number;
  date: Date;
  revenue: number;
  expenses: number;
  net_income: number;
};

interface CreateModalProps {
  columns: MRT_ColumnDef<Transaction>[];
  onClose: () => void;
  onSubmit: (values: Transaction) => void;
  open: boolean;
}

export const CreateNewTransactionModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [values, setValues] = useState<any>(() =>
    columns.slice(1).reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {} as any)
  );
  const theme = useTheme();

  const handleSubmit = () => {
    // validation?
    // create
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: "0.5rem 0.5rem 0.25rem 1.5rem",
          mb: "1rem",
          backgroundColor:
            theme.palette.mode === "light"
              ? theme.palette.background.default
              : theme.palette.background.paper,
        }}
      >
        <Typography variant="body1">New Transaction</Typography>
        <IconButton title="Close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              pt: "1rem",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "2.5rem",
            }}
          >
            {columns.slice(1).map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="success" onClick={handleSubmit} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const TransactionTable = () => {
  const theme = useTheme();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const transactionsKey: QueryKey = ["transactions"];
  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    queryKey: [transactionsKey],
    queryFn: async () => {
      const url = new URL("/transactions", import.meta.env.VITE_BASE_URL);
      const response = await fetch(url.href);
      return await response.json();
    },
    keepPreviousData: true,
  });

  const columns = useMemo<MRT_ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
      },
      {
        accessorKey: "date",
        header: "Date",
      },
      {
        accessorKey: "revenue",
        header: "Revenue",
      },
      {
        accessorKey: "expenses",
        header: "Expenses",
      },
      {
        accessorKey: "net_income",
        header: "Net Income",
      },
    ],
    []
  );

  const handleExportRows = (rows: MRT_Row<Transaction>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const [tableData, setTableData] = useState<Transaction[]>(() => data);

  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const handleCreateNewRow = (values: Transaction) => {
    console.log("~ Unauthorized ~");
    // tableData.push(values);
    // setTableData([...tableData]);
  };

  const handleSaveRowEdits: MaterialReactTableProps<Transaction>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        tableData[row.index] = values;
        // edit and refetch data.
        setTableData([...tableData]);
        exitEditingMode();
      }
    };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<Transaction>) => {
      if (!confirm(`Are you sure you want to delete ${row.getValue("id")}`)) {
        return;
      }
      // delete and refetch data.
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      justifyContent="center"
      paddingX="4rem"
      overflow="auto"
      bgcolor={theme.palette.background.paper}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
        }}
      >
        <Typography variant="h5">Transactions</Typography>
        <ThemeProvider theme={theme}>
          <MaterialReactTable
            displayColumnDefOptions={{
              "mrt-row-actions": {
                muiTableHeadCellProps: {
                  align: "left",
                },
                size: 120,
              },
            }}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton onClick={() => table.setEditingRow(row)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(row)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            editingMode="row"
            enableColumnResizing
            enableFilterMatchHighlighting
            enableEditing
            columns={columns}
            data={data ?? []}
            initialState={{ showColumnFilters: true }}
            enableRowSelection
            enableGrouping
            onEditingRowSave={handleSaveRowEdits}
            onEditingRowCancel={handleCancelRowEdits}
            positionToolbarAlertBanner="bottom"
            muiToolbarAlertBannerProps={
              isError
                ? {
                    color: "error",
                    children: "Error loading data",
                  }
                : undefined
            }
            renderTopToolbarCustomActions={({ table }) => (
              <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" gap={1}>
                  <Button
                    onClick={handleExportData}
                    startIcon={<FileDownloadIcon />}
                    variant="contained"
                  >
                    Export raw
                  </Button>
                  <Button
                    disabled={
                      table.getPrePaginationRowModel().rows.length === 0
                    }
                    onClick={() =>
                      handleExportRows(table.getPrePaginationRowModel().rows)
                    }
                    startIcon={<FileDownloadIcon />}
                    variant="contained"
                  >
                    Export filtered
                  </Button>
                  <Button
                    disabled={table.getRowModel().rows.length === 0}
                    onClick={() => handleExportRows(table.getRowModel().rows)}
                    startIcon={<FileDownloadIcon />}
                    variant="contained"
                  >
                    Export page
                  </Button>
                  <Button
                    disabled={
                      !table.getIsSomeRowsSelected() &&
                      !table.getIsAllRowsSelected()
                    }
                    onClick={() =>
                      handleExportRows(table.getSelectedRowModel().rows)
                    }
                    startIcon={<FileDownloadIcon />}
                    variant="contained"
                  >
                    Export selection
                  </Button>
                </Box>
                <Box display="flex" gap={1}>
                  <Button
                    onClick={() => setCreateModalOpen(true)}
                    variant="contained"
                  >
                    New
                  </Button>
                  <Tooltip arrow title="Refresh data">
                    <IconButton onClick={() => refetch()}>
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            )}
            state={{
              isLoading,
              showAlertBanner: isError,
              showProgressBars: isFetching,
            }}
          />
          <CreateNewTransactionModal
            columns={columns}
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewRow}
          />
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default TransactionTable;
