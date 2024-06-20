import React, { useEffect, useState } from 'react';
import Content from './components/Content';
import diariesService from './services/diaries';
import { NonSensitiveDiaryEntry, Visibility, Weather } from './types';

const App = () => {
  const [allDiaries, setAllDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [newDate, setNewDate] = useState<string>('');
  const [newVisibility, setNewVisibility] = useState<Visibility>(
    Visibility.Good
  );
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Sunny);
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    const getAllDiaries = async () => {
      const result = await diariesService.getAllDiaries();
      setAllDiaries(result);
    };
    getAllDiaries();
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const result = await diariesService.createNewDiary({
        date: newDate,
        weather: newWeather,
        visibility: newVisibility,
        comment: newComment
      });
      setAllDiaries(allDiaries.concat(result));
      setNewDate('');
      setNewComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '200px' }}
      >
        <input
          placeholder='date'
          type='date'
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <select
          value={newVisibility}
          onChange={(e) => setNewVisibility(e.target.value as Visibility)}
        >
          <option value={Visibility.Great}>Great</option>
          <option value={Visibility.Good}>Good</option>
          <option value={Visibility.Ok}>Ok</option>
          <option value={Visibility.Poor}>Poor</option>
        </select>
        <select
          value={newWeather}
          onChange={(e) => setNewWeather(e.target.value as Weather)}
        >
          <option value={Weather.Sunny}>Sunny</option>
          <option value={Weather.Rainy}>Rainy</option>
          <option value={Weather.Cloudy}>Cloudy</option>
          <option value={Weather.Stormy}>Stormy</option>
          <option value={Weather.Windy}>Windy</option>
        </select>
        <input
          placeholder='comment'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type='submit'>add</button>
      </form>
      <Content allDiaries={allDiaries} />
    </div>
  );
};

export default App;
