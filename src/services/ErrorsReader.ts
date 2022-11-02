export async function readErrors(rawResponse: Response): Promise<any> {
  const response = await rawResponse.json();

  if (response.error) {
    return response.error;
  } else if (response.errors) {
    const message = response.errors.join('\n');
    return message;
  }
}
