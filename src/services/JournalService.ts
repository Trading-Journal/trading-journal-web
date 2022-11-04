import { BalanceModel } from '../model/BalanceModel';
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

export const getJournal = (
  accessToken: string,
  journalId: string
): Promise<JournalModel> => {
  return fetch(`http://localhost:8081/journals/${journalId}`, {
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
    .then((response: JournalModel) => response);
};

export const getJournalBalance = (
  accessToken: string,
  journalId: string
): Promise<BalanceModel> => {
  return fetch(`http://localhost:8081/journals/${journalId}/balance`, {
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
    .then((response: BalanceModel) => response);
};
