import { Balance } from '../model/Balance';
import { Journal, JournalRequest } from '../model/Journal';
import { apiFormat } from '../util/DateFormat';
import { readErrors } from './ErrorsReader';

export const getAllJournals = (accessToken: string): Promise<Journal[]> => {
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
    .then((response: Journal[]) => response);
};

export const getJournal = (
  accessToken: string,
  journalId: string
): Promise<Journal> => {
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
    .then((response: Journal) => response);
};

export const getJournalBalance = (
  accessToken: string,
  journalId: string
): Promise<Balance> => {
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
    .then((response: Balance) => response);
};

export const deleteJournal = (
  accessToken: string,
  journalId: string
): Promise<any> => {
  return fetch(`http://localhost:8081/journals/${journalId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then(async (response) => {
    if (response.ok) return response;
    else {
      const errors = await readErrors(response);
      throw new Error(errors);
    }
  });
};

export const saveJournal = (
  accessToken: string,
  journal: JournalRequest
): Promise<Journal> => {
  return fetch('http://localhost:8081/journals', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...journal,
      startJournal: apiFormat(journal.startJournal),
    }),
  })
    .then(async (response) => {
      if (response.ok) return response.json();
      else {
        const errors = await readErrors(response);
        throw new Error(errors);
      }
    })
    .then((response: Journal) => response);
};
