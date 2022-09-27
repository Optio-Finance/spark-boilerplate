/* eslint-disable */
import type { Prisma, User, Project, Account, Session, VerificationToken } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        RelationName: "projects" | "accounts" | "sessions";
        ListRelations: "projects" | "accounts" | "sessions";
        Relations: {
            projects: {
                Shape: Project[];
                Types: PrismaTypes["Project"];
            };
            accounts: {
                Shape: Account[];
                Types: PrismaTypes["Account"];
            };
            sessions: {
                Shape: Session[];
                Types: PrismaTypes["Session"];
            };
        };
    };
    Project: {
        Name: "Project";
        Shape: Project;
        Include: Prisma.ProjectInclude;
        Select: Prisma.ProjectSelect;
        OrderBy: Prisma.ProjectOrderByWithRelationInput;
        WhereUnique: Prisma.ProjectWhereUniqueInput;
        Where: Prisma.ProjectWhereInput;
        RelationName: "users";
        ListRelations: "users";
        Relations: {
            users: {
                Shape: User[];
                Types: PrismaTypes["User"];
            };
        };
    };
    Account: {
        Name: "Account";
        Shape: Account;
        Include: Prisma.AccountInclude;
        Select: Prisma.AccountSelect;
        OrderBy: Prisma.AccountOrderByWithRelationInput;
        WhereUnique: Prisma.AccountWhereUniqueInput;
        Where: Prisma.AccountWhereInput;
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    Session: {
        Name: "Session";
        Shape: Session;
        Include: Prisma.SessionInclude;
        Select: Prisma.SessionSelect;
        OrderBy: Prisma.SessionOrderByWithRelationInput;
        WhereUnique: Prisma.SessionWhereUniqueInput;
        Where: Prisma.SessionWhereInput;
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    VerificationToken: {
        Name: "VerificationToken";
        Shape: VerificationToken;
        Include: never;
        Select: Prisma.VerificationTokenSelect;
        OrderBy: Prisma.VerificationTokenOrderByWithRelationInput;
        WhereUnique: Prisma.VerificationTokenWhereUniqueInput;
        Where: Prisma.VerificationTokenWhereInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}