import { NonSensitiveDiaryEntry } from '../types';

interface ContentProps {
  allDiaries: NonSensitiveDiaryEntry[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      <h3>Diary entries</h3>
      {props.allDiaries.map((diary) => (
        <div key={diary.id}>
          <b>{diary.date}</b>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default Content;
