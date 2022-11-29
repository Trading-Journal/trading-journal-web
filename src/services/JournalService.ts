import { Balance, Journal, JournalRequest } from 'model';
import { apiFormat, config } from 'utilities';
import { readErrors } from './ErrorsReader';

export const getAllJournals = (accessToken: string): Promise<Journal[]> => {
  return fetch(`${config.entries}/journals`, {
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
  return fetch(`${config.entries}/journals/${journalId}`, {
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
  return fetch(`${config.entries}/journals/${journalId}/balance`, {
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
  return fetch(`${config.entries}/journals/${journalId}`, {
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
  return fetch(`${config.entries}/journals`, {
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
