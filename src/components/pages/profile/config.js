import {
    skillsOption,
    locationsOption,
    inputField,
    selectorField,
    ruleField,
    fileField,
  } from "../../shared/customForm/config";

export const formSet = [
    {
      name: "firstName",
      label: "First Name",
      rule: ruleField(true, "Please input First Name!"),
      fieldType: inputField,
    },
    {
      name: "lastName",
      label: "Last Name",
      rule: ruleField(true, "Please input Last Name!"),
      fieldType: inputField,
    },
    {
      name: "contact",
      label: "Contact Number",
      rule: ruleField(true, "Please input Contact!"),
      fieldType: inputField,
    },
    {
      name: "link",
      label: "Linkedin/Website",
      rule: ruleField(true, "Please input Linkedin/Website!"),
      fieldType: inputField,
    },
    {
      name: "skill",
      label: "Skills",
      rule: ruleField(true, "Please input Skills!"),
      fieldType: selectorField(skillsOption, "multiple"),
    },
    {
      name: "location",
      label: "Locations",
      rule: ruleField(true, "Please input Locations!"),
      fieldType: selectorField(locationsOption, "multiple"),
    },
    {
      name: "image",
      label: "Upload Image",
      rule: ruleField(false, "Please upload an Image!"),
      fieldType: fileField,
    },
  ];
  