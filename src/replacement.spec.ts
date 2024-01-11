import { replaceTokens } from "./replacement";
import {describe, expect, test} from '@jest/globals';

describe('Token replacement lib', () => {
    test('Does simple token replacement for a single token', () => {
        const inputString = "Have a :quality: day today!";
        const inputTokenValue = "good";
        const expectedResult = "Have a good day today!";

        const result = replaceTokens(
            inputString,
            {
                quality: inputTokenValue
            }
        );
        expect(result).toEqual(expectedResult);
    });
    test('Does simple token replacement for multiple tokens', () => {
        const inputString = "Have a :quality: day :when:!";
        const qualityTokenValue = "bad";
        const whenTokenValue = "tomorrow";
        const expectedResult = "Have a bad day tomorrow!";

        const result = replaceTokens(
            inputString,
            {
                quality: qualityTokenValue,
                when: whenTokenValue
            }
        );
        expect(result).toEqual(expectedResult);
    });
    test('Works with custom separator which leaves colon (:) in place', () => {
        const inputString = ":Have: :a <sep>quality<sep> day today!";
        const qualityTokenValue = "good";
        const expectedResult = ":Have: :a good day today!";

        const result = replaceTokens(
            inputString,
            {
                quality: qualityTokenValue,
            },
            {
                tokenSeparator: '<sep>'
            }
        );
        expect(result).toEqual(expectedResult);
    });
    test('Works with custom transformer', () => {
        const inputString = "Have a :quality: day today!";
        const qualityTokenValue = "good";
        const expectedResult = "Have a GOOD day today!";

        const result = replaceTokens(
            inputString,
            {
                quality: qualityTokenValue,
            },
            {
                transformer: (a) => a.toUpperCase()
            }
        );
        expect(result).toEqual(expectedResult);
    });
    test('Works with custom transformer and token separator', () => {
        const inputString = "Have a _quality_ day today!";
        const qualityTokenValue = "good";
        const expectedResult = "Have a goodgood day today!";

        const result = replaceTokens(
            inputString,
            {
                quality: qualityTokenValue,
            },
            {
                transformer: (a) => `${a}${a}`,
                tokenSeparator: "_"
            }
        );
        expect(result).toEqual(expectedResult);
    });
});