export type QuestionBase = {
  conceptId: string;
  correctExplanation: string;
  id: string;
  isFinalChallenge?: boolean;
  prompt: string;
  title: string;
  verificationSection?: 'AP' | 'PA' | 'OBLICUA' | 'LATERAL' | 'INTEGRADORA';
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

