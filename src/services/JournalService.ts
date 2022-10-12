import { JournalModel } from '../model/JournalModel';

export async function getAllJournals(
  accessToken: string
): Promise<JournalModel[]> {
  try {
    const response = await fetch('http://localhost:8081/journals', {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return await response.json();
  } catch (error) {
    return [];
  }
}
