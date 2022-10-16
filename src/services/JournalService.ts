import { JournalModel } from '../model/JournalModel';
import { readErrors } from './ErrorsReader';

export const getAllJournals = (
  accessToken: string
): Promise<JournalModel[]> => {
  return fetch('http://localhost:8081/journals', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then(async (response) => {
      if (response.ok) return response.json();
      else {
        const errors = await readErrors(response);
        throw new Error(errors);
      }
    })
    .then((response: JournalModel[]) => response);
};
