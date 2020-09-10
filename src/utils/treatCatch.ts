export default function treatCatch(e: any): ApiResponse {
  if (e.response) {
    throw {
      status: "error",
      error: e.response.data ? e.response.data : e.response.status,
    };
  } else {
    throw {
      status: "error",
      error: e,
    };
  }
}
