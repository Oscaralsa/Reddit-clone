export async function getUsersPostApi(id: string) {
  const url = `/api/profile?id=${id}`
  
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }

  try {
    const response = await fetch(url, params);
    if (response.status === 200){
      return response.json()
    }
    return response.text();
  } catch (err) {
    return err;
  }
}
