import { UpdateForm } from '@/store/types/user';
import { ValidationError } from '@/errors/ValidateError';

export type ValidationErrorItem = {
  name: string;
  message: string;
};

export const addValidationErrorItem = <T>(
  errorItems: ValidationErrorItem[],
  name: keyof T,
  message: string
): ValidationErrorItem[] => {
  const error: ValidationErrorItem = {
    name: String(name),
    message,
  };
  errorItems.push(error);
  return errorItems;
};

// NOTE: validateメソッドではnullチェックは行わない（型で保証されているため）
//       型で保証されない文字数の上限判定や特殊な整合性のチェックのみ行う
export const validateUpdateForm = (value: UpdateForm): void => {
  const errors: ValidationErrorItem[] = [];

  if (value.name.length === 0) {
    addValidationErrorItem<UpdateForm>(
      errors,
      'name',
      '名前は1文字以下を入力してください。'
    );
  }

  if (value.name.length > 50) {
    addValidationErrorItem<UpdateForm>(
      errors,
      'name',
      '名前は50文字以下を入力してください。'
    );
  }

  if (errors.length) {
    console.error('throw ValidationError.');
    throw new ValidationError(errors);
  }
};
