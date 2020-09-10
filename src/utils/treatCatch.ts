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
