"use client" // <--- ต้องมีบรรทัดนี้เพื่อแก้ปัญหา Event Handler

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Search, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 1. TYPE DEFINITION & MOCK DATA (ไม่มีการเปลี่ยนแปลง)
interface Receipt {
  id: string;
  name: string;
  date: string;
  amount: number;
}

function generateMockData(count: number): Receipt[] {
  const data: Receipt[] = [];
  const items = ["เสื้อยืดคอกลม", "กางเกงยีนส์", "กระเป๋าสะพาย", "รองเท้าผ้าใบ", "ค่าจัดส่ง", "หมวกแก๊ป", "นาฬิกา"];
  const amounts = [599, 1250, 850, 1999.50, 60, 390, 2500];

  for (let i = 1; i <= count; i++) {
    const itemIndex = i % items.length;
    const amountIndex = i % amounts.length;
    const day = (i % 30) + 1;
    const month = ((i % 3) + 4); 
    const date = `2024-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    data.push({
      id: `R${String(i).padStart(3, '0')}`,
      name: `${items[itemIndex]} (${i})`,
      date: date,
      amount: amounts[amountIndex],
    });
  }
  return data;
}

const RECEIPTS_DATA = generateMockData(200);

// 2. COLUMN DEFINITION (ไม่มีการเปลี่ยนแปลง)
const handleViewReceipt = (receiptId: string) => {
    alert(`กำลังจะแสดงใบเสร็จเลขที่: ${receiptId}`);
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(amount);
};

export const columns: ColumnDef<Receipt>[] = [
  { accessorKey: "id", header: "ID", cell: ({ row }) => <div className="font-medium hidden sm:table-cell">{row.getValue("id")}</div>, },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 hover:bg-transparent"
      >
        ชื่อรายการ
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "date",
    header: "วันที่",
    cell: ({ row }) => {
      const dateString: string = row.getValue("date");
      return new Date(dateString).toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">ราคา</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return <div className="text-right font-medium">{formatCurrency(amount)}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleViewReceipt(row.original.id)}
        >
          ดูใบเสร็จ
        </Button>
      </div>
    ),
  },
];

// 3. DATA TABLE COMPONENT (ไม่มีการเปลี่ยนแปลง)
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
    initialState: {
        pagination: {
            pageSize: 10,
        },
    }
  });

  const pageSizeOptions = [10, 20, 50, 100];
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 py-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="ค้นหาชื่อรายการ..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  ไม่พบรายการ
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        
        <div className="flex-1 text-sm text-muted-foreground">
            แสดง {table.getState().pagination.pageSize} รายการต่อหน้า
        </div>
        
        <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">แถวต่อหน้า:</p>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value))
                    }}
                    className="h-8 w-16 rounded-md border border-input bg-background text-sm p-1"
                >
                    {pageSizeOptions.map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                หน้า {table.getState().pagination.pageIndex + 1} จาก{" "}
                {table.getPageCount()}
            </div>
            
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    ก่อนหน้า
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    ถัดไป
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}

// 4. EXPORT COMPONENT (เปลี่ยนชื่อให้ตรงกับที่คุณเรียกใช้: <ReceiptsTable />)
export function ReceiptsTable() {
    return (
        <DataTable columns={columns} data={RECEIPTS_DATA} />
    )
}