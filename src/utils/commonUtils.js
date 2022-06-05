import { chain, isPlainObject, isArray, isString } from "lodash";
import apiStatusEnum from "../enums/apiStatusEnum";

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

export const requestStatus = (currentStatus) =>
  [apiStatusEnum.SUCCESS, apiStatusEnum.RELOADING].includes(currentStatus)
    ? apiStatusEnum.RELOADING
    : apiStatusEnum.REQUESTED;

/* Extract label:value from a list of objects, for listing */
export const extractLabelList = (list, addLabel = null, noNull = false) => {
  const newList = list.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  if (!noNull) {
    newList.push({ label: "Any", value: null });
  }
  if (addLabel) {
    newList.push({ label: addLabel, value: "add" });
  }

  return newList;
};

export const filterSubjects = ({
  subjects,
  subjectCategoryIds,
  educationLevelIds,
}) => {
  return chain(subjects)
    .filter(
      (subject) =>
        (!subjectCategoryIds ||
          subjectCategoryIds.includes(subject.subjectCategory.id)) &&
        (!educationLevelIds ||
          educationLevelIds.includes(subject.educationLevel))
    )
    .value();
};
