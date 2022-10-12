import { EntryModel } from './../model/EntryModel';

export async function getAllEntries(
  accessToken: string,
  journalId: string
): Promise<EntryModel[]> {
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
