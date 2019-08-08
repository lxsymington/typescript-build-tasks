import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import log from 'fancy-log';
import { IStyleOptions } from '../style';

/* -----------------------------------
 *
 * Build
 *
 * -------------------------------- */

const processor = postcss([autoprefixer, cssnano]);

const postcssBuild = async (
   options: IStyleOptions
): Promise<IStyleOptions> => {
   const { input, output, css, map, flags, config } = options;
   const postcssOptions = {
      from: input,
      to: output,
      map: {
         inline: false,
         prev: map.toString(),
         sourcesContent: true,
      },
   };

   try {
      const {
         css: resultCSS,
         map: resultMap,
         messages,
      } = await processor.process(css.toString(), postcssOptions);

      if (messages) {
         messages.map(message => {
            log(message);
         });
      }

      return {
         input,
         output,
         css: resultCSS,
         map: resultMap.toString(),
         flags,
         config,
      };
   } catch (err) {
      log.error(err);
   }
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default postcssBuild;
