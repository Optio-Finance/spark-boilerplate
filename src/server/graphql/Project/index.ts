// import { getProjectPaidPlan } from "../../get-project-paid-plan";
// import { plans } from "../../stripe/plans";
import slug from "slug";
// import stripe from "../../stripe";
import { builder } from "../builder";
import prisma from "../../db/prisma";
import { sendEmail } from "../../send-email";

builder.prismaObject("Project", {
  findUnique: (project) => ({ id: project.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    status: t.exposeString("status"),
    slug: t.exposeString("slug"),
    name: t.exposeString("name"),
    stripeCustomerId: t.exposeString("stripeCustomerId", { nullable: true }),
    content: t.expose("content", { nullable: true, type: "JSON" }),
    users: t.relation("users"),
  }),
});

builder.queryFields((t) => ({
  project: t.prismaField({
    type: "Project",
    nullable: true,
    args: {
      id: t.arg.string(),
      slug: t.arg.string(),
    },
    resolve: async (_, __, args, ctx: any) => {
      if (!ctx.user?.id) return null;
      if ((!args.id && !args.slug) || (args.id && args.slug))
        throw new Error(
          "Please provide either an ID or a slug to the project query"
        );

      return prisma.project.findFirst({
        where: {
          users: {
            some: {
              id: ctx.user.id,
            },
          },
          id: args.id as string,
          slug: args.slug as string,
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createProject: t.prismaField({
    type: "Project",
    nullable: true,
    args: {
      name: t.arg.string({
        required: true,
      }),
    },
    resolve: (_, __, args, ctx: any) => {
      if (!ctx.user?.id) return null;
      return prisma.project.create({
        data: {
          name: args.name,
          slug: slug(args.name),
          users: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });
    },
  }),
  inviteToProject: t.boolean({
    args: {
      projectId: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
    },
    resolve: async (_, args, context: any) => {
      if (!context.user?.id) return false;
      await sendEmail({
        to: args.email,
        subject: `${context.user.name || context.user.email} invited you`,
        text: `Hey! Click on this link to accept your invite: ${args.projectId}`,
      });
      return true;
    },
  }),
  removeFromProject: t.prismaField({
    type: "Project",
    nullable: true,
    args: {
      userId: t.arg.string({ required: true }),
      projectId: t.arg.string({ required: true }),
    },
    resolve: (_, __, args, ctx: any) => {
      if (!ctx.user?.id) return null;
      return prisma.project.update({
        where: {
          id: args.projectId,
        },
        data: {
          users: {
            disconnect: {
              id: args.userId,
            },
          },
        },
      });
    },
  }),
}));
