import db from "../../db.js";
import { fail } from "../../utils.js";

export async function execute(cmd) {
    const name = cmd.options.getString("name");

    if (await db("networks").findOne({ name })) {
        return fail("A network with that name exists already.");
    }

    if (!name.matches(/^[A-Za-z0-9_\- ]+$/)) {
        return fail(
            "Only letters, numbers, underscores, dashes, and spaces are permitted."
        );
    }
}
