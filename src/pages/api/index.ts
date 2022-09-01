import prisma from "@server/db/prisma";
import { schema } from "@server/graphql/schema";
import {
  getGraphQLParameters,
  processRequest,
  shouldRenderGraphiQL,
} from "graphql-helix";
import { renderPlaygroundPage } from "graphql-playground-html";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import nc from "next-connect";
import { error } from "next/dist/build/output/log";

export default nc<NextApiRequest, NextApiResponse>({
  onError: (err, _, res) => {
    error(err);
    res.status(500).end(err.toString());
  },
}).use(async (req: NextApiRequest, res: NextApiResponse) => {
  const request = {
    body: req.body,
    headers: req.headers,
    method: String(req.method),
    query: req.query,
  };

  if (shouldRenderGraphiQL(request)) {
    return res.send(
      renderPlaygroundPage({
        endpoint: "/api",
      })
    );
  }
  const { operationName, query, variables } = getGraphQLParameters(request);
  const createContext = async ({ req }: any) => {
    const user = await getToken({ req });
    return {
      ...user,
      prisma,
    };
  };
  const result = await processRequest({
    operationName,
    query,
    variables,
    request,
    schema,
    contextFactory: () => createContext({ req }),
  });
  if (result.type === "RESPONSE") {
    result.headers.forEach(({ name, value }) => res.setHeader(name, value));
    res.status(result.status).json(result.payload);
  }
});
