import { _db_count } from "./count";
import { _db_select } from "./select";

const db = {
  select: _db_select,
  count: _db_count,
};

export default db;
