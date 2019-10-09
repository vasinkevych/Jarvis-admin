import auth from '../services/Auth';
import { getBaseUrl } from '../utils';

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

export const filterTable = (tableData, pattern) => {
  if (!pattern) return tableData;
  if (tableData.length === 0) return tableData;

  // in case data includes only numbers then search by phone field (if it exists)
  if (/^\d+$/.test(pattern) && 'mobile' in tableData[0]) {
    return tableData.filter(dataObj => {
      let searchValReg = new RegExp(`${pattern}`, 'g');
      return searchValReg.test(dataObj.mobile);
    });
  }

  // if filter gains at least one result for the one of the fields it will return it
  // and skip other fields filtering
  const filteredData = getFilteredByFields(
    Object.keys(tableData[0]).filter(objKey => /^[a-z0-9]+$/i.test(objKey)),
    tableData,
    pattern
  );

  if (filteredData.length > 0) return filteredData;

  return tableData;
};

// this function called first, with array of all fields
// if some set of fields got occurrences wi stop filter
// and return result
function getFilteredByFields(fieldsList, arrayToFilter, pattern) {
  return fieldsList.reduce((acc, field) => {
    if (acc.length === 0)
      acc = [...filterByField(field, arrayToFilter, pattern)];
    return acc;
  }, []);
}

// if some of the fields of dataArray is Array of objects
// we searching by every nested field
// while there are any fields or we got some result
function filterByField(field, array, pattern) {
  if (array.length === 0) return [];
  if (Array.isArray(array[0][field])) {
    return array.filter(dataObj => {
      const innerArray = dataObj[field].reduce((acc, innerObject) => {
        return acc.concat(
          getFilteredByFields(Object.keys(innerObject), dataObj[field], pattern)
        );
      }, []);
      return innerArray.length;
    });
  }
  return array.filter(dataObj => {
    let searchValReg = new RegExp(`${pattern}`, 'gi');
    return searchValReg.test(dataObj[field]);
  });
}
