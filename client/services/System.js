import auth from "../services/Auth";
import { getBaseUrl } from "../utils";

export async function fetchTableData(query) {
  try {
    const token = auth.getIdToken();

    const response = await fetch(
      `${getBaseUrl()}/admin/api/execute-sql?query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}
