export async function getUsersPostApi(id: string) {
  const url = `${process.env.REACT_APP_API_URL}/profile?id=${id}`
  
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
