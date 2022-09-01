import type { Prisma, User, Project, Account, Session, VerificationToken } from "/Users/azat/optio/spark/node_modules/.prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        Where: Prisma.UserWhereUniqueInput;
        Fields: "projects" | "accounts" | "sessions";
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
        Where: Prisma.ProjectWhereUniqueInput;
        Fields: "users";
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
        Where: Prisma.AccountWhereUniqueInput;
        Fields: "user";
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
        Where: Prisma.SessionWhereUniqueInput;
        Fields: "user";
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
        Where: Prisma.VerificationTokenWhereUniqueInput;
        Fields: never;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}