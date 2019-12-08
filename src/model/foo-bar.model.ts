import {prop, Ref} from '@typegoose/typegoose';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * FooBar model
 *
 * @export
 * @class FooBar
 */
export class FooBar {
    /**
     *  _id
     *
     * @type {string}
     * @memberof FooBar
     */
    _id?: string;

    /**
     * foo
     *
     * @type {string}
     * @memberof FooBar
     */
    @ApiModelProperty({
        description: 'Foo',
        required: true
    })
    @prop({ required: true})
    foo: string;

    /**
     * bar
     *
     * @type {string}
     * @memberof FooBar
     */
    @ApiModelProperty({
        description: 'Bar',
        required: true
    })
    @prop({ required: true})
    bar: string;

    /**
     * baz
     *
     * @type {string}
     * @memberof FooBar
     */
    @ApiModelProperty({
        description: 'Baz',
        required: true
    })
    @prop({ required: true})
    baz: string;
}
