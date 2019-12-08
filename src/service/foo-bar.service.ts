import { Injectable } from '@nestjs/common';
import {InjectModel} from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

import { Types, QueryFindOneAndUpdateOptions } from 'mongoose';

import { FooBar } from '../model/foo-bar.model';

/**
 * FooBar service
 *
 * @export
 * @class FooBarService
 */
@Injectable()
export class FooBarService {
    constructor(@InjectModel(FooBar) private readonly fooBarModel: ReturnModelType<typeof FooBar>) {}

    /**
     * Gets FooBar by id
     *
     * @param {string} id
     * @returns FooBar
     * @memberof FooBarService
     */
    async getFooBarById(id: string) {
        return await this.fooBarModel.findById({
            _id: Types.ObjectId(id),
        });
    }

    /**
     * Gets all FooBar
     *
     * @returns FooBar[]
     * @memberof FooBarService
     */
    async getAllFooBar() {
        return await this.fooBarModel.find({});
    }

    /**
     * Saves FooBar
     *
     * @param FooBar fooBar
     * @returns FooBar
     * @memberof FooBarService
     */
    async keepFooBar(fooBar: FooBar) {
        return await this.fooBarModel.findOneAndUpdate({
            _id: Types.ObjectId(fooBar._id),
        }, fooBar, { new: true, upsert: true });
    }

    /**
     * Deletes FooBar
     *
     * @param FooBar fooBar
     * @returns FooBar
     * @memberof FooBarService
     */
    async deleteFooBar(fooBar: FooBar) {
        return await this.fooBarModel.findByIdAndDelete({
            _id: Types.ObjectId(fooBar._id),
        });
    }
}
