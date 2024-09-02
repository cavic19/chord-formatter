import * as fs from 'fs';
import { renderHTML } from '../lib/render';
import parse from '../lib/parse';

test.skip('should first', () => { 
    const compact = `
        <[F]>When I look into your <[Dm]>eyes
        I can see a love res<[C]>trained
        Bu<[F]>t darling when I <[Dm]>hold you
        Don't you know I feel the <[C]>same
    `;
    const html = renderHTML(parse(compact));

    fs.writeFileSync(__dirname + '/../../index.html', html);
 })