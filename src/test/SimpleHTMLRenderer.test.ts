import * as fs from 'fs';
import SimpleHTMLRenderer from '../lib/SimpleHTMLRenderer';

test.skip('should first', () => { 
    const compact = `
        <[F]>When I look into your <[Dm]>eyes
        I can see a love res<[C]>trained
        Bu<[F]>t darling when I <[Dm]>hold you
        Don't you know I feel the <[C]>same
    `;
    const html = new SimpleHTMLRenderer("color:red;").renderHTMLFromString(compact);

    fs.writeFileSync(__dirname + '/../../index.html', html);
 })