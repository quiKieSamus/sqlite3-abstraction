import { Statement } from "sqlite3";

type PromiseResponse = {
    status: boolean,
    message: string,
    content: object[] | object
}

export function bind(stmt: Statement, params: (string | number)[]): Statement {
    const bindQuery = stmt.bind(params, (err: any) => {
        if (err) throw err;
    });
    return bindQuery;
}

export function get(stmt: Statement, params: (string | number)[] | null): Promise<PromiseResponse> {
    return new Promise((resolve: any, reject: any) => {
        if (params === null) {
            // params is null, no binding param is done
            stmt.get((err, row) => {
                if (err) throw err;
                if (!row) return reject({
                    status: false,
                    message: "Row not found",
                    content: {}
                });
                return resolve({
                    status: true,
                    message: "all good",
                    content: row
                });
            });
        }
        if (Array.isArray(params)) {
            // params exists, param binding is done
            const bindQuery = bind(stmt, params);
            bindQuery.get((err, row) => {
                if (err) throw err;
                if (!row) return reject({
                    status: false,
                    message: "Row not found",
                    content: {}
                });
                return resolve({
                    status: true,
                    message: "all good",
                    content: row
                });
            });
        }
    });
}

export function all(stmt: Statement, params: (number | string)[] | null): Promise<PromiseResponse> {
    return new Promise((resolve, reject) => {
        if (params === null) {
            // params is null, no binding param is done
            stmt.all((err, rows) => {
                if (err) throw err;
                if (rows.length < 1) return reject({
                    status: false,
                    message: "No rows found",
                    content: {}
                });
                return resolve({
                    status: true,
                    message: "all good",
                    content: rows
                });
            });
        }
        if (Array.isArray(params)) {
            // params exists, param binding is done
            const bindQuery = bind(stmt, params);
            bindQuery.all((err, rows) => {
                if (err) throw err;
                if (rows.length < 1) return reject({
                    status: false,
                    message: "No rows found",
                    content: {}
                });
                return resolve({
                    status: true,
                    message: "all good",
                    content: rows
                });
            });
        }
    });
}

export function run(stmt: Statement, params: (string | number)[] | null): Promise<PromiseResponse> {
    return new Promise((resolve, reject) => {
        if (params === null) {
            stmt.run((err) => {
                if (err) throw err;
                resolve({
                    status: true,
                    content: {},
                    message: "Query executed"
                });
            });
        }

        if (Array.isArray(params)) {
            const bindQuery = bind(stmt, params);
            bindQuery.run((err) => {
                if (err) throw err;
                resolve({
                    status: true,
                    content: {},
                    message: "Query executed"
                });
            });
        }
    });
}

export function finalize(stmt: Statement): Promise<PromiseResponse> {
    return new Promise((resolve, reject) => {
        stmt.finalize((err) => {
            if (err) throw err;
            resolve({
                status: true,
                message: "Statement finalized",
                content: {}
            })
        })
    });
}