"use strict";

class baseRepository {
    constructor(req, res, options = {}) {
        this.req = req;
        this.res = res;
        this.options = options;
    }
    /**
     *Override the findAll method to custom function.
     * @param {*} options
     * @returns {*|Promise.<{rows: Model[]}>}
     */
    findAll(options = {}) {
        return this.model.findAll(options);
    }

    /**
     * Handle pagination
     * @param options
     * @returns {*|Promise.<{rows: Model[]}>}
     */
    paginate(options = {}) {
        options.limit = this.req.limit || 30;
        options.offset = this.req.offset || 0;
        return this.findAll(options);
    }

    /**
     * Find a record by ID.
     * @param id
     * @param options
     * @returns {*|Promise.<Model>}
     */
    findById(id, options) {
        return this.model.findById(id, options);
    }
    /**
     * Create new record.
     * @param values
     * @param options
     * @returns {values}
     */

    create(values, options) {
        return this.model.create(values, options);
    }

    /**
     * Update the given record
     * @param values
     * @param options
     */
    update(values, options) {
        return this.model.update(values, options);
    }

    /**
     * Destroy the records. The request body can be {id: 1} or {id: [1,2,3]} or [{id:1},{id:2},{id:3}]
     * @param options
     * @returns {*|Promise.<undefined>|void|Promise.<Integer>}
     */
    destroy(options) {
        if (Array.isArray(options.where)) {
            options.where = {
                $or: options.where
            };
        } else {
            options.where = {
                $or: {
                    id: this.req.params.id
                }
            };
        }
        options = Object.assign(options, this.deletableConditions);
        return this.model.destroy(options);
    }
}

module.exports = baseRepository;
