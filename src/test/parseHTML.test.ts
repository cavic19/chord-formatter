import SimpleHTMLRenderer from "../lib/SimpleHTMLRenderer";
import parseHTML from "../parsers/parseHTML";
import * as fs from 'fs';

const testHtml = `
<head><meta charset="UTF-8"></head>
<div id="songtext">
 <pre>CAPO 2 (v A moll)

<el class="aline" style="display:inline;">               <span class="akord">Ami</span>    <span class="akord">C</span>
</el>1. Zatímco se koupeš, umýváš si záda,
<el class="aline" style="display:inline;">    <span class="akord">F</span>           <span class="akord">G7</span>                 <span class="akord">C</span>
</el>   na největší loupež ve mně se střádá,
<el class="aline" style="display:inline;">    <span class="akord">Fdim</span>         <span class="akord">Ami</span>
</el>   tak, jako se dáváš vodě,
<el class="aline" style="display:inline;">    <span class="akord">Esdim</span>       <span class="akord">G7</span>
</el>   vezmu si tě já, já - zloděj.

2. Už v tom vážně plavu, za stěnou z umakartu
   piju druhou kávu a kouřím třetí spartu
   a za velmi tenkou stěnou
   slyším, jak se mydlíš pěnou.

<el class="aline" style="display:inline;">                <span class="akord">C</span>      <span class="akord">F</span>                <span class="akord">C</span>
</el>R: Nechej vodu vodou, jen ať si klidně teče,
<el class="aline" style="display:inline;">               <span class="akord">Dmi</span>              <span class="akord">F</span>              <span class="akord">C</span>
</el>   chápej, že touha je touha a čas se pomalu vleče,
<el class="aline" style="display:inline;">             <span class="akord">Dmi</span>          <span class="akord">F</span>              <span class="akord">C</span>
</el>   cigareta hasne, káva stydne, krev se pění,
<el class="aline" style="display:inline;">                <span class="akord">Dmi</span>                      <span class="akord">F</span>              <span class="akord">C</span>
</el>   bylo by to krásné, kdyby srdce bylo klidné, ale ono není.

3. Zatímco se koupeš, umýváš si záda,
   svět se se mnou houpe, všechno mi z rukou padá,
   a až budeš stát na prahu,
   všechny peníze dal bych za odvahu.

R:
<el class="aline" style="display:inline;">    <span class="akord">Dmi</span>   <span class="akord">G7</span> <span class="akord">C</span>        <span class="akord">Dmi</span>      <span class="akord">G7</span>    <span class="akord">C</span>
</el>  + nebylo a není, hm-hm, zatímco se koupeš.
</pre>
</div>
`;

test('should first', () => { 
    const actual = parseHTML(testHtml);
    const html = new SimpleHTMLRenderer("color:red;", "chord").renderHTML(actual);

    fs.writeFileSync(__dirname + '/../../index.html', html);
 })