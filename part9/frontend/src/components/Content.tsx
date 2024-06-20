import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return props.courseParts.map((part) => (
    <Part coursePart={part} key={part.name} />
  ));
};

export default Content;
