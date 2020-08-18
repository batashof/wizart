/**
 * parses a JSON string into an object
 * @param {String} jsonString
 * @returns {Object}
 */
export const parseJSON = (jsonString) => {
  let object = null;
  try {
    object = JSON.parse(jsonString);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('not valid JSON!', error);
  }

  return object;
};

/**
 *
 * @param {Array<String|Number>} array
 * @param {String} delimiter
 * @returns {String}
 */
export const concatenateStyles = (
  array,
  delimiter = ';',
) => array.reduce((acc, value) => `${acc}${value ? `${value}${delimiter}` : ''}`, '');
