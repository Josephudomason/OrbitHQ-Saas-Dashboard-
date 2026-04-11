"use client";

import { useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

type Role = "admin" | "user";

type AccountRow = {
  company: string;
  owner: string;
  plan: string;
  mrr: number;
  seats: number;
  status: "paid" | "trial" | "past_due";
};

const adminRows: AccountRow[] = [
  { company: "Northstar Commerce", owner: "Maya Patel", plan: "Enterprise", mrr: 18200, seats: 140, status: "paid" },
  { company: "Aperture Cloud", owner: "Liam Chen", plan: "Growth", mrr: 9600, seats: 62, status: "trial" },
  { company: "Nimbus Health", owner: "Eva Brown", plan: "Scale", mrr: 12400, seats: 88, status: "paid" },
  { company: "Summit AI", owner: "Noah Wilson", plan: "Starter", mrr: 3200, seats: 18, status: "past_due" },
  { company: "Helio Works", owner: "Sophia Kim", plan: "Growth", mrr: 8400, seats: 54, status: "paid" },
  { company: "Vantage Labs", owner: "Leo Johnson", plan: "Enterprise", mrr: 22100, seats: 176, status: "paid" },
  { company: "Blue Peak", owner: "Ava Garcia", plan: "Scale", mrr: 10800, seats: 73, status: "trial" },
  { company: "Orbit Stack", owner: "Mason Lee", plan: "Starter", mrr: 2800, seats: 14, status: "paid" },
];

const userRows: AccountRow[] = [
  { company: "Launch Board", owner: "Alex Morgan", plan: "Analytics", mrr: 4200, seats: 18, status: "paid" },
  { company: "Workflow Hub", owner: "Taylor Nguyen", plan: "Automation", mrr: 3600, seats: 12, status: "trial" },
  { company: "Pipeline Sync", owner: "Sam Keller", plan: "Storage", mrr: 2900, seats: 9, status: "paid" },
  { company: "Partner Portal", owner: "Chris Young", plan: "Automation", mrr: 3300, seats: 16, status: "paid" },
  { company: "Campaign Desk", owner: "Jordan Reed", plan: "Analytics", mrr: 4700, seats: 21, status: "past_due" },
  { company: "Ops Center", owner: "Priya Shah", plan: "Storage", mrr: 2400, seats: 7, status: "trial" },
  { company: "Growth Sprint", owner: "Emma Davis", plan: "Automation", mrr: 3150, seats: 14, status: "paid" },
  { company: "North Hub", owner: "Daniel Lopez", plan: "Analytics", mrr: 3980, seats: 19, status: "paid" },
];

const columnHelper = createColumnHelper<AccountRow>();

const columns = [
  columnHelper.accessor("company", {
    header: "Company",
    cell: (info) => (
      <div>
        <strong>{info.getValue()}</strong>
        <span>{info.row.original.owner}</span>
      </div>
    ),
  }),
  columnHelper.accessor("plan", {
    header: "Plan",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("mrr", {
    header: "MRR",
    cell: (info) => `$${info.getValue().toLocaleString()}`,
  }),
  columnHelper.accessor("seats", {
    header: "Seats",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <span className={`status-badge status-${info.getValue()}`}>{info.getValue().replace("_", " ")}</span>
    ),
  }),
];

export function DataTablePanel({ role }: { role: Role }) {
  const [sorting, setSorting] = useState<SortingState>([{ id: "mrr", desc: true }]);
  const [filter, setFilter] = useState("");

  const data = useMemo(() => (role === "admin" ? adminRows : userRows), [role]);

  // TanStack Table exposes imperative helpers, so the React Compiler intentionally skips memoizing here.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter: filter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
    globalFilterFn: (row, _columnId, value) => {
      const query = String(value).toLowerCase();
      const { company, owner, plan, status, seats } = row.original;
      return [company, owner, plan, status, String(seats)].some((item) => item.toLowerCase().includes(query));
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 4,
      },
    },
  });

  return (
    <section className="table-shell">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">{role === "admin" ? "Accounts snapshot" : "Project snapshot"}</h2>
          <p className="panel-subtitle">
            Sort, filter, and paginate through the most relevant workspace records.
          </p>
        </div>
      </div>

      <div className="table-controls">
        <input
          className="search-input"
          placeholder="Filter by company or owner"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />

        <div className="chip">
          <strong>{table.getFilteredRowModel().rows.length}</strong>
          visible rows
        </div>
      </div>

      <div className="table-scroll">
        <table className="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        className="sort-button"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <ArrowUpDown size={14} />
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span className="footer-note">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>

        <div className="row-inline">
          <button
            type="button"
            className="page-button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            type="button"
            className="page-button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
