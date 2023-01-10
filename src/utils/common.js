export const formatedDropDownData = (originalData, customKey) => {
  const data = originalData?.map((objectData) => {
    let obj = { ...objectData };
    if (customKey) {
      obj["value"] = obj[customKey];
      obj["label"] = obj[customKey];
    }
    return obj;
  });
  return data;
};
