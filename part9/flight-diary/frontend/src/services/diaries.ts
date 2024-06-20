import axios from 'axios';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const apiBaseUrl = 'http://localhost:3000/api';

const getAllDiaries = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(
    `${apiBaseUrl}/diaries`
  );

  return data;
};

const createNewDiary = async (newDiary: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(
    `${apiBaseUrl}/diaries`,
    newDiary
  );
  const { id, date, weather, visibility } = data;
  return { id, date, weather, visibility };
};

export default {
  getAllDiaries,
  createNewDiary
};
