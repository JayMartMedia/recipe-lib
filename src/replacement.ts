export type ReplacementOptions<T> = {
    tokenSeparator?: string;
    transformer?: (input: T) => string
}

/**
 * Replace the tokens in the string with values from the token object
 * 
 * Basic example:
 * ```
 * const result = replaceTokens(
 *     "this is :person: string",
 *     {
 *         person: "my"
 *     }
 * );
 * 
 * // result === "this is my string"
 * ```
 * 
 * Multiple token example:
 * ```
 * const result = replaceTokens(
 *     "my name is :name: and I am :age: years old",
 *     {
 *         name: "John",
 *         age: "100"
 *     }
 * );
 * 
 * // result === "my name is John and I am 100 years old"
 * ```
 * 
 * Custom transformer function example:
 * ```
 * const result = replaceTokens(
 *     "First person - :person1:\nSecond person - :person2:",
 *     {
 *         person1: {
 *             givenName: "John",
 *             surName: "Doe"
 *         },
 *         person2: {
 *             givenName: "Jane",
 *             surName: "Doeth"
 *         }
 *     },
 *     {
 *         transformer: (person) => `${person.givenName} ${person.surName}`
 *     }
 * );
 * 
 * // result === "First person - John Doe\nSecond person - Jane Doeth"
 * ```
 * 
 * Custom token separator example :
 * ```
 * const result = replaceTokens(
 *     "First person: <sep>person<sep>",
 *     {
 *         person: "John Doe"
 *     },
 *     {
 *         tokenSeparator: "<sep>"
 *     }
 * );
 * 
 * // result === "First person - John Doe\nSecond person - Jane Doeth"
 * ```
 * 
 * @param {string} str the string for which to replace tokens, i.e. "this is :person: string";
 * @param {object} obj the object containing the tokens, i.e. `{person: "my"}`
 * @param {function} transformer (optional) transformer to transform the value of the token into a string.
 *     The default value returns the stringified version of the item itself.
 * @returns {string} the string with token replacement performed
 */
//  export function replaceTokens<T>(str: string, obj: {[key: string]: T}, transformer: (input: T) => string = (a) => a.toString()) {
export function replaceTokens<T>(
    str: string,
    obj: {[key: string]: T},
    _options?: ReplacementOptions<T>
){
    // set default options and allow provided _options to overwrite if provided
    const defaultOptions: ReplacementOptions<T> = {
        transformer: (a) => a.toString(),
        tokenSeparator: ':'
    }
    const options = {
        ...defaultOptions,
        ..._options
    }

    // process the string and replace tokens
    const split = str.split(options.tokenSeparator);
    const updated = split.map(section => {
        return obj[section] ? options.transformer(obj[section]) : section;
    });
    
    // re-add colons if before and after weren't changed
    let outStr = '';
    for(let i = 0; i < split.length; i += 1) {
        // first item
        if(i === 0) {
            outStr += updated[i];
        }else if(split[i - 1] === updated[i - 1] && split[i] === updated[i]) {
            // subsequent items that were NOT changed, should HAVE leading colon
            outStr += ':' + updated[i];
        }else{
            // subsequent items that WERE changed, should NOT add leading colon
            outStr += updated[i];
        }
    }

    return outStr;
}
