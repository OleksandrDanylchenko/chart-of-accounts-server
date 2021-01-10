import { ApiResponseModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Expose } from 'class-transformer';
import { ApiPropertyOptions } from '@nestjs/swagger';

const statusCodeField: ApiPropertyOptions = {
  description: 'Error status code',
  enumName: 'Status codes',
  enum: [404, 400]
};

const messageField: ApiPropertyOptions = {
  description: 'Service error message'
};

const errorField: ApiPropertyOptions = {
  description: 'Stringified error status code',
  enumName: 'Status codes',
  enum: ['Not Found', 'Bad Request']
};

export class ApiResponseError {
  @ApiResponseModelProperty(statusCodeField)
  @Expose()
  statusCode: number;

  @ApiResponseModelProperty(messageField)
  @Expose()
  message: string;

  @ApiResponseModelProperty(errorField)
  @Expose()
  error: string;
}
