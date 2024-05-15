import { Transformer } from '@parcel/plugin';
import { parse, renderHTML } from '@djot/djot'

export default new Transformer({
  async transform({asset}) {
    // Retrieve the asset's source code and source map.
    let source = await asset.getCode();
    let result = source.replace(/<djot>([\S\s]*)<\/djot>/g, (m, dep) => {
      // Replace the original specifier with a dependency id 
      // as a placeholder. This will be replaced later with 
      // the final bundle URL.
      let code = renderHTML(parse(dep));
      return '<article class="content">' + code + '</article>';
    });


    // Run it through some compiler, and set the results 
    // on the asset.
    asset.setCode(result);

    // Return the asset
    return [asset];
  }
});
