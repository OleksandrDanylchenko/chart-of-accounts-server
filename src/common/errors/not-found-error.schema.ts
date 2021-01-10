import { ApiResponseModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Expose } from 'class-transformer';
import { ApiPropertyOptions } from '@nestjs/swagger';

const statusCodeField: ApiPropertyOptions = {
  description: '404 Status code',
  default: 404
};

const messageField: ApiPropertyOptions = {
  description: 'Service error message',
  default: 'Module not found. ***'
};

const errorField: ApiPropertyOptions = {
  description: 'Stringified 404 error code',
  default: 'Not found.'
};

export class NotFoundError {
  @ApiResponseModelProperty(statusCodeField)
  @Expose()
  statusCode: number;

  @ApiResponseModelProperty(messageField)
  @Expose()
  message: number;

  @ApiResponseModelProperty(errorField)
  @Expose()
  error: number;
}
