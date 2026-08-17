export type QuestionBase = {
  conceptId: string;
  correctExplanation: string;
  id: string;
  prompt: string;
  title: string;
};

export type ChoiceQuestion = QuestionBase & {
  correctOption: string;
  options: string[];
  type: 'choice' | 'completion' | 'scenario' | 'true-false';
};

export type MultiSelectQuestion = QuestionBase & {
  correctOptions: string[];
  options: string[];
  type: 'multi-select';
};

export type OrderQuestion = QuestionBase & {
  correctOrder: string[];
  options: string[];
  type: 'order';
};

export type TextQuestion = QuestionBase & {
  acceptedAnswers: string[];
  options: [];
  type: 'text';
};

export type PracticeQuestion = ChoiceQuestion | MultiSelectQuestion | OrderQuestion | TextQuestion;
