import { Context } from "../lib/deps.ts";
import * as colorService from '../services/colors.ts';

const render = async (ctx: Context) => {
    await ctx.send({
        root: `${Deno.cwd()}/public/html`,
        index: "index.html"
    })
};

const getColors = (ctx: Context) => {
    const colors = colorService.getColors();
    ctx.response.body = colors;
};

const postColor = async (ctx: Context) => {
    const body = await ctx.request.body().value;
    const color: string = body.color;
    
    const res = colorService.postColor(color);
    ctx.response.body = res;
    //ctx.response.redirect('/');
};

export { render, getColors, postColor };