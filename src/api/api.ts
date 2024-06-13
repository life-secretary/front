import axiosInstance from './axios';

// GET
export async function fetchData(url: string, params: object | null) {
  try {
    return await axiosInstance.get(url, {params});
  } catch (err) {
    throw err;
  }
}

// POST
export async function createData(url: string, data: any) {
  try {
    return await axiosInstance.post(url, data);
  } catch (err) {
    throw err;
  }
}

// PUT
export async function updateData(
  url: string,
  id: number | string | null,
  data: any,
) {
  try {
    const requestUrl = id ? `${url}/${id}` : `${url}`;
    return await axiosInstance.put(requestUrl, data);
  } catch (err) {
    throw err;
  }
}

// DELETE
export async function deleteData(
  url: string,
  params: object,
  id: number | string | number[] | null,
) {
  try {
    const requestUrl = id ? `${url}/${id}` : `${url}`;
    return await axiosInstance.delete(requestUrl, {params});
  } catch (err) {
    throw err;
  }
}
