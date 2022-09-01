import { builder } from "../builder";

builder.prismaObject("User", {
  findUnique: (user) => ({ id: user.id }),
  fields: (t) => ({
    id: t.exposeString("id"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    email: t.exposeString("email"),
    name: t.exposeString("name", { nullable: true }),
    imageUrl: t.exposeString("imageUrl", { nullable: true }),
    projects: t.relation("projects"),
  }),
});

builder.queryFields((t) => ({
  currentUser: t.prismaField({
    type: "User",
    nullable: true,
    resolve: (_, __, ___, ctx: any) => {
      if (!ctx.user?.id) return null;
      return ctx.prisma.user.findUnique({
        where: { id: ctx.user.id },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  updateUser: t.prismaField({
    type: "User",
    nullable: true,
    args: {
      name: t.arg.string(),
    },
    resolve: (_, __, args, ctx: any) => {
      if (!ctx.user?.id || !args.name) return null;
      return ctx.prisma.user.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          name: args.name,
        },
      });
    },
  }),
}));
