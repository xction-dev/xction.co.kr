import { ID } from "@core/constant/common/id";
import { z } from "zod";
import { as, oneLine } from "../util";
import { userTypes } from "./userTypes";

export const UserSchema = z.object({
  id: ID.USER,
  userType: userTypes.schema.shape.value,
  email: z.string(),
  name: z.string(),
  bio: z.string().nullable(),
  thumbnailImage: z.string().nullable(),
  backgroundImage: z.string().nullable(),
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

const JOIN_BY_ID = (predicate: string) => {
  return `
    LEFT JOIN users ON ${predicate} = users.id
    LEFT JOIN userTypes ON users.userTypeId = userTypes.id
  `;
};

export const users = {
  SELECT,
  JOIN_BY_ID,
  schema: UserSchema,
};
