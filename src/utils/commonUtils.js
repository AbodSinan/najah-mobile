import { chain, isPlainObject, isArray, isString } from "lodash";

function transformString({ str, format }) {
  if (!isString(str)) {
    return str;
  }

  if (format === "snake") {
    return str.replace(
      /([a-z][A-Z]|[a-z][0-9])/g,
      (match) => `${match[0]}_${match[1].toLocaleLowerCase()}`
    );
  }

  return str.replace(/_([a-z]|[A-Z]|[0-9])/g, (match) =>
    match[1].toUpperCase()
  );
}

export const transformKeys = ({ obj, format }) => {
  if (isPlainObject(obj)) {
    return chain(obj)
      .mapKeys((val, key) => transformString({ str: key, format }))
      .mapValues((val) => transformKeys({ obj: val, format }))
      .value();
  }
  if (isArray(obj)) {
    return obj.map((obj) => transformKeys({ obj, format }));
  }
  return obj;
};

export const toSnakeKeys = (obj) => {
  return transformKeys({ obj, format: "snake" });
};

export const toCamelCaseKeys = (obj) => {
  return transformKeys({ obj, format: "camelCase" });
};

export const removeError = (errors, endpointName) =>
  chain(errors)
    .filter((error) => error.endpointName !== endpointName)
    .value();

/* Extract label:value from a list of objects, for listing */
export const extractLabelList = (list) =>
  list.map((item) => ({
    label: item.name,
    value: item.id,
  }));

export const filterSubjects = ({
  subjects,
  subjectCategoryId,
  educationLevelId,
}) => {
  return chain(subjects)
    .filter(
      (subject) =>
        (!subjectCategoryId ||
          subjectCategoryId === subject.subjectCategory.id) &&
        (!educationLevelId || educationLevelId === subject.educationLevel.id)
    )
    .value();
};
