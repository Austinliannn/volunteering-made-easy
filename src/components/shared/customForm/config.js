export const causesOption = [
  {
    value: "cause1",
    label: "Cause 1",
  },
  {
    value: "cause2",
    label: "Cause 2",
  },
  {
    value: "cause3",
    label: "Cause 3",
  },
];

export const locationsOption = [
  {
    value: "location1",
    label: "Location 1",
  },
  {
    value: "location2",
    label: "Location 2",
  },
  {
    value: "location3",
    label: "Location 3",
  },
];

export const skillsOption = [
  {
    value: "skill1",
    label: "Skill 1",
  },
  {
    value: "skill2",
    label: "Skill 2",
  },
  {
    value: "skill3",
    label: "Skill 3",
  },
];

export const inputField = {
  name: "input",
  type: "",
  option: [],
};

export const inputPasswordField = {
  name: "inputPassword",
  type: "",
  option: [],
};

export const selectorField = (option, mode) => ({
  name: "selector",
  type: "",
  mode: mode,
  option: option,
});

export const textAreaField = {
  name: "textArea",
  type: "",
  option: [],
};

export const ruleField = (required, message, type, typeMessage) => {
  const rules = [
    {
      required: required,
      message: message,
    },
  ];
  if (type && typeMessage) {
    rules.unshift({
      type: type,
      message: typeMessage,
    });
  }
  return rules;
};

export const fileField = {
  name: "image",
  type: "file",
  option: [],
  accept: "image/*",
};
