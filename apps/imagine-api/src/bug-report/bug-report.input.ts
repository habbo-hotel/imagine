import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class BugReportFilterOneInput {
  @Field(() => Number)
  id!: number;
}

@InputType()
export class BugReportFilterManyInput {
  @Field(() => [Number], {nullable: true})
  ids?: number[];

  @Field(() => Boolean, {nullable: true})
  isOpen?: boolean;

  @Field(() => [Number], {nullable: true})
  severity?: number[];

  @Field(() => [Number], {nullable: true})
  reportingUserIDs?: number[];

  @Field(() => [Number], {nullable: true})
  resolvingUserIDs?: number[];

  @Field(() => Number, {nullable: true})
  limit?: number;
}

@InputType()
export class BugReportCreateInput {
  @Field(() => String)
  content!: string;
}
@InputType()
export class BugReportUpdateInput {
  @Field(() => String, {nullable: true})
  content?: string;

  @Field(() => Number, {nullable: true})
  severity?: number;
}