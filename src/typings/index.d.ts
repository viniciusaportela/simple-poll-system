declare interface ApiResponse {
  status: ApiResponseStatus;
  data?: any;
  error?: any;
}

declare type ApiResponseStatus = "success" | "error";

declare type StatusOrErrorCode = number | string;
