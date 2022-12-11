"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
class Pagination {
    limit = 10;
    offset = 0;
    page = 0;
    constructor(page, size) {
        this.page = page;
        this.limit = size ? size : 3;
        this.offset = page ? page * this.limit : 0;
    }
    data(data) {
        return {
            total_items: data.count,
            items: data.rows,
            total_pages: Math.ceil(data.count / this.limit),
            current_page: this.page ? this.page : 0
        };
    }
}
exports.Pagination = Pagination;
