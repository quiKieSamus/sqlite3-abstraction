import sqlite3 from "sqlite3";
import { get, all } from "../lib/abstraction";

(async () => {
    try {
        const db = new sqlite3.Database("C:\\xampp\\htdocs\\api-infoquick\\infoquick.sqlite", (err) => {
            if (err) {
                console.error(err);
                throw err;
            }
        });
        const stmt = db.prepare(`SELECT * FROM archivo`);
        const results = await all(stmt, null);
        console.log(results);
    } catch (error: any) {
        console.error(error);
    }
})();