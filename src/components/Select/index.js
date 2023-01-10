import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { default as ReactSelect, components } from "react-select";
import _ from "lodash";

const Dropdown = (props) => {
  const { customLabel, customKey, options } = props;
  const [optionsData, setOptionsData] = useState(options);
  const [selectAllStatus, setSelectAllStatus] = useState();

  useEffect(() => {
    if (customLabel || customKey) {
      formatOptionData();
    }
  }, [customLabel, customKey, options]);

  const customStyles = {
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? "#fff" : "#hsl(0deg 0% 50%)",
      padding: 10,
      "&:hover": {
        background: "#359ddc",
        color: "#fff",
      },
      background: state.isSelected ? "#359ddc" : "#fff",
    }),
    control: (base, state) => ({
      ...base,

      border: state.isFocused
        ? ".0625rem solid #2288c7"
        : ".0625rem solid #cdcdcd",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,

      "&:hover": {
        // Overwrittes the different states of border
        border: state.isFocused
          ? ".0625rem solid #359ddc"
          : ".0625rem solid #cdcdcd",
      },
    }),
  };
  const multiSelectCustomStyle = {
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? "black" : "black",
      padding: 10,
      "&:hover": {
        background: "white",
        color: "black",
      },
      background: state.isSelected ? "#fff" : "#fff",
    }),
    control: (base, state) => ({
      ...base,
      border: state.isFocused
        ? ".0625rem solid #2288c7"
        : ".0625rem solid #cdcdcd",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,

      "&:hover": {
        // Overwrittes the different states of border
        border: state.isFocused
          ? ".0625rem solid #359ddc"
          : ".0625rem solid #cdcdcd",
      },
    }),
  };

  const formatOptionData = () => {
    const { options } = props;
    const formatedOptionList = options?.map((objectData) => {
      // console.log("--obj", obj);
      const obj = { ...objectData };
      if (customKey) {
        obj["value"] = obj[customKey];
      }
      if (customLabel) {
        obj["label"] = obj[customLabel];
      }
      return obj;
    });
    setOptionsData(formatedOptionList);
  };

  if (props.allowSelectAll) {
    const Option = (propsOption) => {
      // console.log(
      //   "--propsOption",
      //   propsOption,
      //   propsOption.selectProps,
      //   propsOption.children
      // );
      return (
        <div>
          <components.Option {...propsOption}>
            <input
              type="checkbox"
              checked={
                propsOption.isSelected ||
                _.includes(
                  propsOption.selectProps?.filterValue,
                  propsOption.children
                ) ||
                (optionsData?.length ===
                  propsOption.selectProps?.filterValue?.length &&
                  propsOption.value === "*")
              }
              onChange={(data) => {
                if (propsOption.value === "*") {
                  // console.log(
                  //   "--data.target.checked",
                  //   data.target,
                  //   data.target.checked
                  // );
                  setSelectAllStatus(data.target.checked);
                }
              }}
            />{" "}
            <label>{propsOption.label}</label>
          </components.Option>
        </div>
      );
    };
    return (
      <ReactSelect
        {...props}
        styles={multiSelectCustomStyle}
        options={[props.allOption, ...optionsData]}
        isMulti
        // defaultMenuIsOpen={true} //bydefault menu is open
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        controlShouldRenderValue={true} //not to show the selected item in inputbox
        components={{
          Option,
        }}
        allowSelectAll={true}
        onChange={(seletedWithData, event) => {
          const selected = seletedWithData.filter((data) => {
            return data.label != undefined;
          });
          if (selected !== null && selected.length > 0) {
            if (selected[selected.length - 1].value === props.allOption.value) {
              return props.onChange([props.allOption, ...optionsData]);
            }
            let result = [];

            if (selected.length === optionsData.length) {
              if (selected.includes(props.allOption)) {
                result = selected.filter(
                  (option) => option.value !== props.allOption.value
                );
              } else if (event.action === "select-option") {
                result = [props.allOption, ...optionsData];
              }
              return props.onChange(result);
            }
          }
          return props.onChange(selected);
        }}
      />
      // <ReactSelect
      //   {...props}
      //   styles={customStyles}
      //   options={[props.allOption, ...optionsData]}
      //   onChange={(selected, event) => {
      //     if (selected !== null && selected.length > 0) {
      //       if (selected[selected.length - 1].value === props.allOption.value) {
      //         return props.onChange([props.allOption, ...optionsData]);
      //       }
      //       let result = [];
      //       if (selected.length === optionsData.length) {
      //         if (selected.includes(props.allOption)) {
      //           result = selected.filter(
      //             (option) => option.value !== props.allOption.value
      //           );
      //         } else if (event.action === "select-option") {
      //           result = [props.allOption, ...optionsData];
      //         }
      //         console.log("----1", result);

      //         return props.onChange(result);
      //       }
      //     }
      //     console.log("----2", selected);
      //     return props.onChange(selected);
      //   }}
      // />
    );
  }

  return <ReactSelect {...props} options={optionsData} styles={customStyles} />;
};

Dropdown.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
};

Dropdown.defaultProps = {
  allOption: {
    label: "Select all",
    value: "*",
  },
};

export default Dropdown;
