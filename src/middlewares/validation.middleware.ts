import { validate, ValidationError } from "class-validator";
import { HttpException } from "src/shares/http-exception";
import { StatusCodes } from "http-status-codes";

type Class = { new (...args: any[]): any };

export interface IValidationError {
  field: string;
  rule: string;
  message: string;
}

export const buildError = (
  errors: ValidationError[],
  result: IValidationError[]
) => {
  errors.forEach((el) => {
    if (el.children) {
      buildError(el.children, result);
    }

    const prop = el.property;
    Object.entries(el.constraints || {}).forEach((constraint) => {
      result.push({
        field: prop,
        rule: constraint[0],
        message: constraint[1],
      });
    });
  });

  return result;
};

const validation = (dto: Class, object: object) => {
  return async () => {
    try {
      const data = Object.assign(new dto(), object);
      const errors = await validate(data, { whitelist: true });
      const result: IValidationError[] = [];

      if (errors.length > 0) {
        throw new HttpException(
          StatusCodes.BAD_REQUEST,
          "Input data validation failed",
          buildError(errors, result)
        );
      }
    } catch (error) {
      throw error;
    }
  };
};

export default validation;
