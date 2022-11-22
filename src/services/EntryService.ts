import { EntryImageResponse } from '../model/EntryImageResponse';
import { UploadType } from '../model/UploadType';
import { apiFormat } from '../util/DateFormat';
import { EntryModel } from './../model/EntryModel';
import { readErrors } from './ErrorsReader';

export const getAllEntries = (
  accessToken: string,
  journalId: string
): Promise<EntryModel[]> => {
  return fetch(`http://localhost:8081/entries/${journalId}`, {
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
    .then((response: EntryModel[]) => response);
};

export const saveEntry = (
  accessToken: string,
  journalId: string,
  entry: EntryModel
): Promise<EntryModel> => {
  return fetch(`http://localhost:8081/entries/${journalId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...entry,
      date: apiFormat(entry.date),
      exitDate: apiFormat(entry.exitDate),
    }),
  })
    .then(async (response) => {
      if (response.ok) return response.json();
      else {
        const errors = await readErrors(response);
        throw new Error(errors);
      }
    })
    .then((response: EntryModel) => response);
};

export const deleteEntry = (
  accessToken: string,
  journalId: string,
  entry: EntryModel
): Promise<any> => {
  return fetch(`http://localhost:8081/entries/${journalId}/${entry.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    if (response.ok) return response;
    else {
      const errors = await readErrors(response);
      throw new Error(errors);
    }
  });
};

export const getEntryImage = (
  accessToken: string,
  journalId: string,
  entry: EntryModel,
  type: UploadType
): Promise<EntryImageResponse> => {
  return fetch(
    `http://localhost:8081/entries/${journalId}/${entry.id}/image?type=${type}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then(async (response) => {
      if (response.ok) return response.json();
      else {
        const errors = await readErrors(response);
        throw new Error(errors);
      }
    })
    .then((response: EntryImageResponse) => response);
};
