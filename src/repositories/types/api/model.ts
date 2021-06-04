export type CommonValues = Identifier & RecordingDate;

export type Identifier = {
  id: number;
};

export type RecordingDate = {
  created_at: string;
  updated_at: string;
};

export type UserValues = {
  name: string;
};

export type User = UserValues & CommonValues;
