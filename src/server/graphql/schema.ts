import { builder } from "./builder";
import "../graphql/Project";
import "../graphql/User";

builder.queryType({});
builder.mutationType({});

export const schema = builder.toSchema({});
