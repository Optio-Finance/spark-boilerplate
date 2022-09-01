import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import { Prisma } from "@prisma/client";
import { resolvers } from "graphql-scalars";
import type PrismaTypes from "../db/pothos-types";
import prisma from "../db/prisma";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    ID: {
      Input: string;
      Output: string;
    };
    DateTime: {
      Input: Date;
      Output: Date;
    };
    JSON: {
      Input: Prisma.JsonValue;
      Output: Prisma.JsonValue;
    };
  };
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

builder.addScalarType("DateTime", resolvers.DateTime, {});
builder.addScalarType("JSON", resolvers.JSON, {});
