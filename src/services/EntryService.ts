import {
  Deposit,
  Entry,
  EntryImageResponse,
  Taxes,
  Trade,
  UploadType,
  Withdrawal,
} from '../model';
import { apiFormat } from '../util';
import { readErrors } from './ErrorsReader';

export const getAllEntries = (
  accessToken: string,
  journalId: string
): Promise<Entry[]> => {
  return fetch(`http://localhost:8081/journals/${journalId}/entries`, {
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
    .then((response: Entry[]) => response);
};

export const saveEntry = (
  accessToken: string,
  journalId: string,
  entry: Entry
): Promise<Entry> => {
  return fetch(`http://localhost:8081/journals/${journalId}/entries/trade`, {
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
    .then((response: Entry) => response);
};

export const saveTrade = (
  accessToken: string,
  journalId: string,
  trade: Trade,
  tradeId?: string
): Promise<Entry> => {
  let url = `http://localhost:8081/journals/${journalId}/entries/trade`;
  let method = 'POST';
  if (tradeId) {
    url += `/${tradeId}`;
    method = 'PATCH';
  }

  return fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...trade,
      date: apiFormat(trade.date),
      exitDate: apiFormat(trade.exitDate),
    }),
  })
    .then(async (response) => {
      if (response.ok) return response.json();
      else {
        const errors = await readErrors(response);
        throw new Error(errors);
      }
    })
    .then((response: Entry) => response);
};

export const saveWithdrawal = (
  accessToken: string,
  journalId: string,
  withdrawal: Withdrawal
): Promise<Entry> => {
  return fetch(
    `http://localhost:8081/journals/${journalId}/entries/withdrawal`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...withdrawal,
        date: apiFormat(withdrawal.date),
      }),
    }
  )
    .then(async (response) => {
      if (response.ok) return response.json();
      else {
        const errors = await readErrors(response);
        throw new Error(errors);
      }
    })
    .then((response: Entry) => response);
};

export const saveDeposit = (
  accessToken: string,
  journalId: string,
  deposit: Deposit
): Promise<Entry> => {
  return fetch(`http://localhost:8081/journals/${journalId}/entries/deposit`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...deposit,
      date: apiFormat(deposit.date),
    }),
  })
    .then(async (response) => {
      if (response.ok) return response.json();
      else {
        const errors = await readErrors(response);
        throw new Error(errors);
      }
    })
    .then((response: Entry) => response);
};

export const saveTaxes = (
  accessToken: string,
  journalId: string,
  taxes: Taxes
): Promise<Entry> => {
  return fetch(`http://localhost:8081/journals/${journalId}/entries/taxes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...taxes,
      date: apiFormat(taxes.date),
    }),
  })
    .then(async (response) => {
      if (response.ok) return response.json();
      else {
        const errors = await readErrors(response);
        throw new Error(errors);
      }
    })
    .then((response: Entry) => response);
};

export const deleteEntry = (
  accessToken: string,
  journalId: string,
  entry: Entry
): Promise<any> => {
  return fetch(
    `http://localhost:8081/journals/${journalId}/entries/${entry.id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  ).then(async (response) => {
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
  entry: Entry,
  type: UploadType
): Promise<EntryImageResponse> => {
  return fetch(
    `http://localhost:8081/journals/${journalId}/entries/${entry.id}/image?type=${type}`,
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
