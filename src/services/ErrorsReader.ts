import { UnauthorizedError } from '../model';

export async function readErrors(rawResponse: Response): Promise<any> {
  if (rawResponse.status === 401) {
    throw new UnauthorizedError();
  }
  const response = await rawResponse.json();

  if (response.error) {
    return response.error;
  } else if (response.errors) {
    const message = response.errors.join('\n');
    return message;
  }
}
