export type CommonValues = Identifier & RecordingDate;

export type Identifier = {
  id: number;
};

export type RecordingDate = {
  createdAt: Date;
  updatedAt: Date;
};
