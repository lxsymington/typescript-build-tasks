import run from './run';
import clean from './clean';
import targetedStyle from './style/targeted';

/* -----------------------------------
 *
 * Start
 *
 * -------------------------------- */

async function startStyle() {
   await run(clean);
   await run(targetedStyle);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default startStyle;
