import { ID } from "@core/constant/common/id";
import { z } from "zod";
import { as, oneLine } from "../util";

export const UserSchema = z.object({
  id: ID.USER,
  userTypeId: z.number(),
  email: z.string(),
  name: z.string(),
  bio: z.string().nullable(),
  thumbnailImage: z.string().nullable(),
});
export type UserSchema = z.infer<typeof UserSchema>;

const SELECT = (config?: { name?: string }) => {
  const { name } = config || {};
  return oneLine(`
    users.id${as("id", name)},
    userTypes.value${as("userType", name, true)},
    users.email${as("email", name)},
    users.name${as("name", name)},
    users.bio${as("bio", name)},
    users.thumbnailImage${as("thumbnailImage", name)},
    users.backgroundImage${as("backgroundImage", name)}
  `);
};

const JOIN = () => {
  return `
    LEFT JOIN userTypes ON users.userTypeId = userTypes.id
  `;
};

const JOIN_BY_ID = (predicate: string) => {
  return `
    LEFT JOIN users ON ${predicate} = users.id
    LEFT JOIN userTypes ON users.userTypeId = userTypes.id
  `;
};

export const users = {
  SELECT,
  JOIN,
  JOIN_BY_ID,
  schema: UserSchema,
};
