import {DangerCircleSvg} from "./danger-circle";
import {DefaultCircleSvg} from "./default-circle";
import {SuccessCircleSvg} from "./success-circle";
import {WarningCircleSvg} from "./warning-circle";

export const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Deprecated", uid: "deprecated"},
  {name: "In Review", uid: "inReview"},
  {name: "Archived", uid: "archived"},
] as const;

export type StatusOptions = (typeof statusOptions)[number]["name"];

export const statusColorMap: Record<StatusOptions, JSX.Element> = {
  Active: SuccessCircleSvg,
  Deprecated: DangerCircleSvg,
  "In Review": WarningCircleSvg,
  Archived: DefaultCircleSvg,
};

type FileType = "Component" | "API" | "Script" | "Config" | "Asset" | "Test" | "Documentation";

export type FileInfo = {
  name: string;
  path: string;
  type: FileType;
};

export type CodebaseFile = {
  id: number;
  fileID: string;
  fileInfo: FileInfo;
  extension: string;
  status: StatusOptions;
  created: Date;
  lastEdited: Date;
  qualityReview: Date | null;
  linesOfCode: number;
  author: string;
};

export type ColumnsKey =
  | "fileID"
  | "fileInfo"
  | "extension"
  | "type"
  | "status"
  | "created"
  | "lastEdited"
  | "qualityReview"
  | "linesOfCode"
  | "author"
  | "actions";

export const INITIAL_VISIBLE_COLUMNS: ColumnsKey[] = [
  "fileID",
  "fileInfo",
  "extension",
  "type",
  "status",
  "lastEdited",
  "linesOfCode",
  "author",
  "actions",
];

export const columns = [
  {name: "File ID", uid: "fileID"},
  {name: "File Info", uid: "fileInfo", sortDirection: "ascending"},
  {name: "Extension", uid: "extension"},
  {name: "Type", uid: "type"},
  {name: "Status", uid: "status", info: "The file's current status"},
  {name: "Created", uid: "created"},
  {name: "Last Edited", uid: "lastEdited"},
  {name: "Quality Review", uid: "qualityReview"},
  {name: "Lines of Code", uid: "linesOfCode"},
  {name: "Author", uid: "author"},
  {name: "Actions", uid: "actions"},
];

const fileNames = [
  "App", "Home", "Dashboard", "UserProfile", "Settings", "Navigation", "Footer",
  "Header", "Sidebar", "LoginForm", "RegisterForm", "Button", "Input", "Modal",
  "Table", "Chart", "API", "Database", "Authentication", "Authorization",
  "Middleware", "Utils", "Helpers", "Constants", "Types", "Interfaces", "Context",
  "Reducer", "Store", "Actions", "Effects", "Services", "Hooks", "Layout",
  "ErrorBoundary", "NotFound", "Loading", "Toast", "Notification", "Theme"
];

const extensions = [".tsx", ".ts", ".js", ".py", ".svg", ".json", ".md"];

const fileTypes: FileType[] = ["Component", "API", "Script", "Config", "Asset", "Test", "Documentation"];

const authors = [
  "Alice Johnson", "Bob Smith", "Charlie Brown", "David Wilson", "Eve Martinez",
  "Frank Thompson", "Grace Garcia", "Hannah Lee", "Isaac Anderson", "Julia Roberts"
];

const generateMockFileData = (count: number): CodebaseFile[] => {
  const mockData: CodebaseFile[] = [];

  for (let i = 0; i < count; i++) {
    const fileName = fileNames[Math.floor(Math.random() * fileNames.length)];
    const extension = extensions[Math.floor(Math.random() * extensions.length)];
    const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
    const author = authors[Math.floor(Math.random() * authors.length)];

    const file: CodebaseFile = {
      id: i,
      fileID: `FILE-${Math.floor(Math.random() * 1000)}`,
      fileInfo: {
        name: `${fileName}${extension}`,
        path: `/src/${fileType.toLowerCase()}s/${fileName}${extension}`,
        type: fileType,
      },
      extension: extension,
      status: Math.random() > 0.7 ? "Active" : Math.random() > 0.5 ? "In Review" : Math.random() > 0.2 ? "Deprecated" : "Archived",
      created: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      lastEdited: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      qualityReview: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000) : null,
      linesOfCode: Math.floor(Math.random() * 1000) + 10,
      author: author,
    };

    mockData.push(file);
  }

  return mockData;
};

export const files: CodebaseFile[] = generateMockFileData(40);