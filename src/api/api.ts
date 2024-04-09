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
  params: object,
  id: number,
  data: any,
) {
  try {
    return await axiosInstance.put(`${url}/${id}`, {params}, data);
  } catch (err) {
    throw err;
  }
}

// DELETE
export async function deleteData(url: string, params: object, id: number) {
  try {
    return await axiosInstance.delete(`${url}/${id}`, {params});
  } catch (err) {
    throw err;
  }
}
