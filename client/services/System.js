import auth from '../services/Auth';
import { getBaseUrl } from '../utils';

export async function fetchTableData(query, notifyError) {
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
    notifyError(err.message);
  }
}

export const filterTable = (tableData, pattern) => {
  if (!pattern) return tableData;
  if (tableData.length === 0) return tableData;

  const reg = new RegExp(`${pattern}`, 'gi');

  return tableData.reduce((acc, dataItem) => {
    if (reg.test(JSON.stringify(dataItem))) {
      acc.push(dataItem);
    }
    return acc;
  }, []);
};
