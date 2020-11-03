export async function getAllPostApi(page: number) {
  const url = `${process.env.REACT_APP_API_URL}/post?page=${page}`
  
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
