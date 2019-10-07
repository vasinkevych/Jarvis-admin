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

export const filterTable = (tableData, pattern) => {
  if (!pattern) return tableData;

  // in case data includes only numbers then search by phone field (if it exists)
  if (/^\d+$/.test(pattern) && "mobile" in tableData[0]) {
    return tableData.filter(dataObj => {
      let searchValReg = new RegExp(`${pattern}`, "g");
      return searchValReg.test(dataObj.mobile);
    });
  }

  // in case data includes field name then search by name field
  if ("name" in tableData[0]) {
    return tableData.filter(dataObj => {
      let searchValReg = new RegExp(`${pattern}`, "gi");
      return searchValReg.test(dataObj.name);
    });
  }

  return tableData;
};
