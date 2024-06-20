interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartExtension extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartExtension {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartExtension {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends CoursePartExtension {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
