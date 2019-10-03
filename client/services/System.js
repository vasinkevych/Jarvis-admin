import auth from '../services/Auth';
import { getBaseUrl } from '../utils';

let SystemQuery = "";
let tableData = [];

export function setTableData(data) {
  tableData = data;
};

export function getTableData() {
  return tableData;
}

export function setQuery(query) {
  SystemQuery = query;
}

export function getQuery() {
  return SystemQuery;
}

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
    let res = await response.json();
    return res;
  } catch (err) {
    console.error(err);
  }
}
