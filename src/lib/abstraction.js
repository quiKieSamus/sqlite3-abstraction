"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalize = exports.run = exports.all = exports.get = exports.bind = void 0;
function bind(stmt, params) {
    var bindQuery = stmt.bind(params, function (err) {
        if (err)
            throw err;
    });
    return bindQuery;
}
exports.bind = bind;
function get(stmt, params) {
    return new Promise(function (resolve, reject) {
        if (params === null) {
            // params is null, no binding param is done
            stmt.get(function (err, row) {
                if (err)
                    throw err;
                if (!row)
                    return reject({
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
            var bindQuery = bind(stmt, params);
            bindQuery.get(function (err, row) {
                if (err)
                    throw err;
                if (!row)
                    return reject({
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
exports.get = get;
function all(stmt, params) {
    return new Promise(function (resolve, reject) {
        if (params === null) {
            // params is null, no binding param is done
            stmt.all(function (err, rows) {
                if (err)
                    throw err;
                if (rows.length < 1)
                    return reject({
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
            var bindQuery = bind(stmt, params);
            bindQuery.all(function (err, rows) {
                if (err)
                    throw err;
                if (rows.length < 1)
                    return reject({
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
exports.all = all;
function run(stmt, params) {
    return new Promise(function (resolve, reject) {
        if (params === null) {
            stmt.run(function (err) {
                if (err)
                    throw err;
                resolve({
                    status: true,
                    content: {},
                    message: "Query executed"
                });
            });
        }
        if (Array.isArray(params)) {
            var bindQuery = bind(stmt, params);
            bindQuery.run(function (err) {
                if (err)
                    throw err;
                resolve({
                    status: true,
                    content: {},
                    message: "Query executed"
                });
            });
        }
    });
}
exports.run = run;
function finalize(stmt) {
    return new Promise(function (resolve, reject) {
        stmt.finalize(function (err) {
            if (err)
                throw err;
            resolve({
                status: true,
                message: "Statement finalized",
                content: {}
            });
        });
    });
}
exports.finalize = finalize;
