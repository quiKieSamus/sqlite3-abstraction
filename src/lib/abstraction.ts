import { Statement } from "sqlite3";

type PromiseResponse = {
    status: boolean,
    message: string,
    content: object[] | object
}

export function get(query: Statement, params: (string | number)[] | null): Promise<PromiseResponse> {
    return new Promise((resolve: any, reject: any) => {
        if (params === null) {
            // params is null, no binding param is done
            query.get((err, row) => {
                if (err) throw err;
                if (!row) return reject({
                    status: false,
                    message: "Something went wrong",
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
            const bindQuery = query.bind(params, (err: any) => {
                if (err) throw err;
            });
            bindQuery.get((err, row) => {
                if (err) throw err;
                if (!row) return reject({
                    status: false,
                    message: "Something went wrong",
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

export function all(query: Statement, params: (number | string)[] | null): Promise<PromiseResponse> {
    return new Promise((resolve, reject) => {
        if (params === null) {
            // params is null, no binding param is done
            query.all((err, rows) => {
                if (err) throw err;
                if (rows.length < 1) return reject({
                    status: false,
                    message: "Something went wrong",
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
            const bindQuery = query.bind(params, (err: Error) => {
                if (err) throw err;
            });
            bindQuery.all((err, rows) => {
                if (err) throw err;
                if (rows.length < 1) return reject({
                    status: false,
                    message: "Something went wrong",
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