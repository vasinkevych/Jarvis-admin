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
    const values = getValues({ ...dataItem, id: '', __typename: '' }).join('');

    if (reg.test(values)) {
      acc.push(dataItem);
    }
    return acc;
  }, []);
};

function getValues(targetObj) {
  let result = [];
  Object.keys(targetObj).forEach(key => {
    if (Array.isArray(targetObj[key])) {
      result = result.concat(
        targetObj[key].reduce((acc, item) => {
          acc = acc.concat(getValues(item));
          return acc;
        }, [])
      );
    } else if (targetObj[key] instanceof Object) {
      result = result.concat(getValues(targetObj[key]));
    } else {
      result.push(targetObj[key]);
    }
  });
  return result;
}
