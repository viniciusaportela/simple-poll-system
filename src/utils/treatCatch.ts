/**
 * If servers send response body in an fail request,
 * throw it
 *
 * @param e - The Caught Error in Axios Request
 */
export default function treatCatch(e: any) {
  if (e.response) {
    throw {
      error: e.response.data ? e.response.data : e.response.status,
    };
  } else {
    throw {
      error: e,
    };
  }
}
