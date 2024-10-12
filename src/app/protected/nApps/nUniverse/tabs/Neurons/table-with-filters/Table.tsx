"use client";

import type {Selection, SortDescriptor} from "@nextui-org/react";
import type {ColumnsKey, StatusOptions, CodebaseFile} from "./data";
import type {Key} from "@react-types/shared";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  RadioGroup,
  Radio,
  Chip,
  User,
  Pagination,
  Divider,
  Tooltip,
  useButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import {SearchIcon} from "@nextui-org/shared-icons";
import React, {useMemo, useRef, useCallback, useState} from "react";
import {Icon} from "@iconify/react";
import {cn} from "@nextui-org/react";

import {CopyText} from "./copy-text";
import {EyeFilledIcon} from "./eye";
import {EditLinearIcon} from "./edit";
import {DeleteFilledIcon} from "./delete";
import {ArrowDownIcon} from "./arrow-down";
import {ArrowUpIcon} from "./arrow-up";

import {useMemoizedCallback} from "./use-memoized-callback";

import {columns, INITIAL_VISIBLE_COLUMNS, files} from "./data";
import {Status} from "./Status";

import { useFileSystemSupabase } from '@/hooks/useFileSystemSupabase';

// Add this type to your existing types or create a new type file
type ColumnWidth = {
  [key in ColumnsKey]?: string;
};

export default function TableComponent() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "fileInfo",
    direction: "ascending",
  });

  const [typeFilter, setTypeFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [createdFilter, setCreatedFilter] = React.useState("all");

  const {
    files: supabaseFiles,
    isUpdatingSupabase,
    supabaseError,
    refreshFilesAndUpdateSupabase
  } = useFileSystemSupabase();

  const handleRefresh = useCallback(() => {
    refreshFilesAndUpdateSupabase();
  }, [refreshFilesAndUpdateSupabase]);

  // Adjust column widths
  const columnWidths: ColumnWidth = {
    fileID: "50px", // Increased width for better visibility
    fileInfo: "200px",
    extension: "50px",
    type: "120px",
    author: "150px",
    created: "180px",
    lastEdited: "180px",
    linesOfCode: "120px",
    qualityReview: "180px",
    status: "120px",
    actions: "120px",
  };

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns
      .map((item) => {
        if (item.uid === sortDescriptor.column) {
          return {
            ...item,
            sortDirection: sortDescriptor.direction,
          };
        }

        return item;
      })
      .filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns, sortDescriptor]);

  const itemFilter = useCallback(
    (file: CodebaseFile) => {
      const allType = typeFilter === "all";
      const allStatus = statusFilter === "all";
      const allCreated = createdFilter === "all";

      return (
        (allType || typeFilter === file.fileInfo.type.toLowerCase()) &&
        (allStatus || statusFilter === file.status.toLowerCase()) &&
        (allCreated ||
          new Date(
            new Date().getTime() -
              +(createdFilter.match(/(\d+)(?=Days)/)?.[0] ?? 0) * 24 * 60 * 60 * 1000,
          ) <= new Date(file.created))
      );
    },
    [createdFilter, statusFilter, typeFilter],
  );

  const filteredItems = useMemo(() => {
    let filteredFiles = [...files];

    if (filterValue) {
      filteredFiles = filteredFiles.filter((file) =>
        file.fileInfo.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    filteredFiles = filteredFiles.filter(itemFilter);

    return filteredFiles;
  }, [filterValue, itemFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: CodebaseFile, b: CodebaseFile) => {
      const col = sortDescriptor.column as keyof CodebaseFile;

      let first = a[col];
      let second = b[col];

      if (col === "fileInfo") {
        first = a[col].name;
        second = b[col].name;
      } else if (col === "created" || col === "lastEdited" || col === "qualityReview") {
        first = new Date(first as string);
        second = new Date(second as string);
      }

      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const filterSelectedKeys = useMemo(() => {
    if (selectedKeys === "all") return selectedKeys;
    let resultKeys = new Set<Key>();

    if (filterValue) {
      filteredItems.forEach((item) => {
        const stringId = String(item.id);

        if ((selectedKeys as Set<string>).has(stringId)) {
          resultKeys.add(stringId);
        }
      });
    } else {
      resultKeys = selectedKeys;
    }

    return resultKeys;
  }, [selectedKeys, filteredItems, filterValue]);

  const eyesRef = useRef<HTMLButtonElement | null>(null);
  const editRef = useRef<HTMLButtonElement | null>(null);
  const deleteRef = useRef<HTMLButtonElement | null>(null);
  const {getButtonProps: getEyesProps} = useButton({ref: eyesRef});
  const {getButtonProps: getEditProps} = useButton({ref: editRef});
  const {getButtonProps: getDeleteProps} = useButton({ref: deleteRef});
  const getFileInfoProps = useMemoizedCallback(() => ({
    onClick: handleFileInfoClick,
  }));

  const renderCell = useMemoizedCallback((file: CodebaseFile, columnKey: React.Key) => {
    const fileKey = columnKey as ColumnsKey;

    const cellValue = file[fileKey as keyof CodebaseFile] as string;

    switch (fileKey) {
      case "fileID":
        return <CopyText>{cellValue}</CopyText>;
      case "fileInfo":
        return (
          <User
            avatarProps={{radius: "lg", src: `https://api.dicebear.com/6.x/initials/svg?seed=${file.fileInfo.name}`}}
            classNames={{
              name: "text-default-foreground",
              description: "text-default-500",
            }}
            description={file.fileInfo.path}
            name={file.fileInfo.name}
          >
            {file.fileInfo.path}
          </User>
        );
      case "created":
      case "lastEdited":
      case "qualityReview":
        return (
          <div className="flex items-center gap-1">
            <Icon
              className="h-[16px] w-[16px] text-default-300"
              icon="solar:calendar-minimalistic-linear"
            />
            <p className="text-nowrap text-small capitalize text-default-foreground">
              {cellValue ? new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(new Date(cellValue)) : "N/A"}
            </p>
          </div>
        );
      case "extension":
      case "type":
      case "author":
        return (
          <div className="text-nowrap text-small capitalize text-default-foreground">
            {cellValue}
          </div>
        );
      case "linesOfCode":
        return <div className="text-default-foreground">{cellValue}</div>;
      case "status":
        return <Status status={cellValue as StatusOptions} />;
      case "actions":
        return (
          <div className="flex items-center justify-end gap-2">
            <EyeFilledIcon
              {...getEyesProps()}
              className="cursor-pointer text-default-400"
              height={18}
              width={18}
            />
            <EditLinearIcon
              {...getEditProps()}
              className="cursor-pointer text-default-400"
              height={18}
              width={18}
            />
            <DeleteFilledIcon
              {...getDeleteProps()}
              className="cursor-pointer text-default-400"
              height={18}
              width={18}
            />
          </div>
        );
      default:
        return cellValue;
    }
  });

  const onNextPage = useMemoizedCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  });

  const onPreviousPage = useMemoizedCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  });

  const onSearchChange = useMemoizedCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  });

  const onSelectionChange = useMemoizedCallback((keys: Selection) => {
    if (keys === "all") {
      if (filterValue) {
        const resultKeys = new Set(filteredItems.map((item) => String(item.id)));

        setSelectedKeys(resultKeys);
      } else {
        setSelectedKeys("all");
      }
    } else {
      setSelectedKeys(keys);
    }
  });

  const topContent = useMemo(() => {
    return (
      <div className="flex items-center gap-4 overflow-auto px-[6px] py-[4px]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4">
            <Input
              className="min-w-[200px]"
              endContent={<SearchIcon className="text-default-400" width={16} />}
              placeholder="Search files"
              size="sm"
              value={filterValue}
              onValueChange={onSearchChange}
            />
            <div>
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Button
                    className="bg-default-100 text-default-800"
                    size="sm"
                    startContent={
                      <Icon className="text-default-400" icon="solar:tuning-2-linear" width={16} />
                    }
                  >
                    Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex w-full flex-col gap-6 px-2 py-4">
                    <RadioGroup
                      label="File Type"
                      value={typeFilter}
                      onValueChange={setTypeFilter}
                    >
                      <Radio value="all">All</Radio>
                      <Radio value="component">Component</Radio>
                      <Radio value="api">API</Radio>
                      <Radio value="script">Script</Radio>
                      <Radio value="config">Config</Radio>
                      <Radio value="asset">Asset</Radio>
                      <Radio value="test">Test</Radio>
                      <Radio value="documentation">Documentation</Radio>
                    </RadioGroup>

                    <RadioGroup label="Status" value={statusFilter} onValueChange={setStatusFilter}>
                      <Radio value="all">All</Radio>
                      <Radio value="active">Active</Radio>
                      <Radio value="deprecated">Deprecated</Radio>
                      <Radio value="inReview">In Review</Radio>
                      <Radio value="archived">Archived</Radio>
                    </RadioGroup>

                    <RadioGroup
                      label="Created Date"
                      value={createdFilter}
                      onValueChange={setCreatedFilter}
                    >
                      <Radio value="all">All</Radio>
                      <Radio value="last7Days">Last 7 days</Radio>
                      <Radio value="last30Days">Last 30 days</Radio>
                      <Radio value="last60Days">Last 60 days</Radio>
                    </RadioGroup>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className="bg-default-100 text-default-800"
                    size="sm"
                    startContent={
                      <Icon className="text-default-400" icon="solar:sort-linear" width={16} />
                    }
                  >
                    Sort
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Sort"
                  items={headerColumns.filter((c) => !["actions"].includes(c.uid))}
                >
                  {(item) => (
                    <DropdownItem
                      key={item.uid}
                      onPress={() => {
                        setSortDescriptor({
                          column: item.uid,
                          direction:
                            sortDescriptor.direction === "ascending" ? "descending" : "ascending",
                        });
                      }}
                    >
                      {item.name}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div>
              <Dropdown closeOnSelect={false}>
                <DropdownTrigger>
                  <Button
                    className="bg-default-100 text-default-800"
                    size="sm"
                    startContent={
                      <Icon
                        className="text-default-400"
                        icon="solar:sort-horizontal-linear"
                        width={16}
                      />
                    }
                  >
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Columns"
                  items={columns.filter((c) => !["actions"].includes(c.uid))}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {(item) => <DropdownItem key={item.uid}>{item.name}</DropdownItem>}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <Divider className="h-4" orientation="vertical" />

          <div className="whitespace-nowrap text-sm text-default-800">
            {filterSelectedKeys === "all"
              ? "All items selected"
              : `${filterSelectedKeys.size} Selected`}
          </div>

          {(filterSelectedKeys === "all" || filterSelectedKeys.size > 0) && (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="bg-default-100 text-default-800"
                  endContent={
                    <Icon className="text-default-400" icon="solar:alt-arrow-down-linear" />
                  }
                  size="sm"
                  variant="flat"
                >
                                Selected Actions
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Selected Actions">
                <DropdownItem>Delete</DropdownItem>
                <DropdownItem>Archive</DropdownItem>
                <DropdownItem>Review</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    filterSelectedKeys,
    headerColumns,
    sortDescriptor,
    statusFilter,
    typeFilter,
    createdFilter,
    onSearchChange,
    setVisibleColumns,
  ]);

  const handleFileInfoClick = useMemoizedCallback(() => {
    setSortDescriptor({
      column: "fileInfo",
      direction: sortDescriptor.direction === "ascending" ? "descending" : "ascending",
    });
  });

  const topBar = useMemo(() => {
    return (
      <div className="mb-[18px] flex items-center justify-between">
        <div className="flex w-[226px] items-center gap-2">
          <h1 className="text-2xl font-[700] leading-[32px]">Codebase</h1>
          <Chip className="hidden items-center text-default-500 sm:flex" size="sm" variant="flat">
            {files.length}
          </Chip>
        </div>
        <Tooltip content={isUpdatingSupabase ? "Updating..." : "Refresh Files"}>
          <Button
            isIconOnly
            color="primary"
            aria-label="Refresh"
            isLoading={isUpdatingSupabase}
            onClick={handleRefresh}
          >
            {!isUpdatingSupabase && <Icon icon="solar:refresh-bold" width={20} />}
          </Button>
        </Tooltip>
      </div>
    );
  }, [files.length, isUpdatingSupabase, handleRefresh]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex flex-col items-center justify-between gap-1 px-2 py-2 sm:flex-row">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="flex items-center justify-end gap-6">
          <span className="text-small text-default-400">
            {filterSelectedKeys === "all"
              ? "All items selected"
              : `${filterSelectedKeys.size} of ${filteredItems.length} selected`}
          </span>
          <div className="flex items-center gap-3">
            <Button isDisabled={page === 1} size="sm" variant="flat" onPress={onPreviousPage}>
              Previous
            </Button>
            <Button isDisabled={page === pages} size="sm" variant="flat" onPress={onNextPage}>
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }, [filterSelectedKeys, page, pages, filteredItems.length, onPreviousPage, onNextPage]);

  return (
    <div className="flex justify-center w-full h-full">
      <div className="w-full">
        {topBar}
        {supabaseError && (
          <div className="text-danger mb-2">Error updating Supabase: {supabaseError}</div>
        )}
        <Table
          isHeaderSticky
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            base: "overflow-x-auto",
            table: "min-w-full",
            th: "bg-transparent text-xs py-2", // Reduced font size and padding
            td: "whitespace-nowrap text-xs py-1", // Reduced font size and padding
            tr: "border-b border-divider",
          }}
          selectedKeys={filterSelectedKeys}
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={onSelectionChange}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "fileID" ? "start" : column.uid === "actions" ? "end" : "start"}
                style={{ 
                  width: columnWidths[column.uid as ColumnsKey],
                  paddingLeft: column.uid === "fileID" ? "0" : undefined
                }}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={sortedItems}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell 
                    style={{ 
                      width: columnWidths[columnKey as ColumnsKey],
                      paddingLeft: columnKey === "fileID" ? "0" : undefined
                    }}
                  >
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}