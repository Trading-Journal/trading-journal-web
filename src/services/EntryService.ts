import { EntryModel } from './../model/EntryModel';
import { accessToken } from './AccessToken';

export async function getAllEntries(journalId: string): Promise<EntryModel[]> {
  try {
    const response = await fetch(`http://localhost:8081/entries/${journalId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return await response.json();
  } catch (error) {
    return [];
  }
}
