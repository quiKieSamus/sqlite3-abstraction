import sqlite3 from "sqlite3";
import { run, get, all, finalize} from "../lib/abstraction";

(async () => {
    try {
        const db = new sqlite3.Database("C:\\xampp\\htdocs\\api-infoquick\\infoquick.sqlite", (err) => {
            if (err) {
                console.error(err);
                throw err;
            }
        });
        const stmt = db.prepare(`SELECT * FROM usuario`);
        const results = await get(stmt, null);
        console.log(await finalize(stmt));
        console.log(results);
        console.log(await get(stmt, null));
    } catch (error: any) {
        console.error(error);
    }
})();