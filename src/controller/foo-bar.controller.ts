import { Req, Res, Param, Body, Controller, Get, Post, UseGuards, Delete, HttpStatus, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags, ApiImplicitParam } from '@nestjs/swagger';

import { FooBarService } from '../service/foo-bar.service';

import { FooBar } from '../model/foo-bar.model';

/**
 * FooBar controller
 *
 * @export
 * @class FooBarController
 */
@ApiBearerAuth()
@ApiUseTags('FooBar')
@Controller('fooBar')
export class FooBarController {
    constructor(private readonly fooBarService: FooBarService) { }

    /**
     * Saves FooBar
     *
     * @param FooBar fooBar
     * @returns {Promise<FooBar>}
     * @memberof FooBarController
     */
    @UseGuards(AuthGuard('jwt'))
    @Post('keepFooBar')
    async keepFooBar(@Res() res, @Body() fooBar: FooBar): Promise<FooBar> {
        const _fooBar = await this.fooBarService.keepFooBar(fooBar);
        return res.status(HttpStatus.OK).json(_fooBar);
    }

    /**
     * Gets FooBar by id
     *
     * @param {string} id
     * @returns {Promise<FooBar>}
     * @memberof FooBarController
     */
    @UseGuards(AuthGuard('jwt'))
    @Get('getFooBarById/:id')
    @ApiImplicitParam({ name: 'id', required: true})
    async getFooBarById(@Res() res, @Param('id') id: string): Promise<FooBar> {
        const _fooBar = await this.fooBarService.getFooBarById(id);
        if (!_fooBar) { throw new NotFoundException('FooBar does not exist!'); }
        return res.status(HttpStatus.OK).json(_fooBar);
    }

    /**
     * Gets all FooBar
     *
     * @returns {Promise<FooBar[]>}
     * @memberof FooBarController
     */
    @UseGuards(AuthGuard('jwt'))
    @Get('getAllFooBar')
    async getAllFooBar(@Res() res): Promise<FooBar[]> {
        const allFooBar = await this.fooBarService.getAllFooBar();
        if (allFooBar.length == 0) { throw new NotFoundException('Is empty!'); }
        return res.status(HttpStatus.OK).json(allFooBar);
    }

    /**
     * Deletes FooBar
     *
     * @param FooBar fooBar
     * @returns {Promise<FooBar>}
     * @memberof FooBarController
     */
    @UseGuards(AuthGuard('jwt'))
    @Delete('deleteFooBar')
    async deleteFooBar(@Res() res, @Body() fooBar: FooBar): Promise<FooBar> {
        const _fooBar = await this.fooBarService.deleteFooBar(fooBar);
        if (!_fooBar) { throw new NotFoundException('FooBar does not exist!'); }
        return res.status(HttpStatus.OK).json(_fooBar);
    }
}
