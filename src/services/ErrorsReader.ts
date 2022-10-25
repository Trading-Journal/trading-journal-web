export async function readErrors(rawResponse: Response): Promise<any> {
  const response = await rawResponse.json();

  //break lines somehow
  if (response.error) {
    return response.error;
  } else if (response.errors) {
    return response.errors;
  }
}
