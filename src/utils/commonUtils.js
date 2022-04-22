import {chain, isPlainObject, isArray, isString } from 'lodash'

export const transformString = ({str, format}) => {
    if (!isString(str)) {
        return str;
    }

    if (format === "snake") {
        return str[0].toLowerCase() + str.slice(1, str.length).replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }

    return str.toLowerCase().replace(/[-_][a-z]/g, (group) => group.slice(-1).toUpperCase());
}

export const transformKeys = ({obj, format}) => {
    if (isPlainObject(obj)) {
        return chain(obj)
            .mapKeys((val, key) => transformString({ str: key, format}))
            .mapValues((val) => transformKeys({obj: val, format}))
            .value()
    }
    if (isArray(obj)) {
        return obj.map((obj) => transformKeys({ obj, format }));
      }
      return obj;
}

export const toSnakeKeys = (obj) => {
    return transformKeys({ obj, format: "snake" });
};

export const toCamelCaseKeys = (obj) => {
    return transformKeys({ obj, format: "camelCase" });
};

export const removeError = (errors, endpointName) => ( 
    chain(errors).filter((error) => error.endpointName !== endpointName).value()
);