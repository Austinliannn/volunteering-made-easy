export const causesOption = [
  {
    value: "humanRights",
    label: "Human Rights",
  },
  {
    value: "animals",
    label: "Animals",
  },
  {
    value: "culture",
    label: "Culture",
  },
  {
    value: "youth",
    label: "Youth",
  },
  {
    value: "community",
    label: "Community",
  },
  {
    value: "technology",
    label: "Technology",
  },
  {
    value: "education",
    label: "Education",
  },
  {
    value: "medical",
    label: "Medical",
  },
  {
    value: "seniors",
    label: "Seniors",
  }
];

export const locationsOption = [
  {
    value: "orchard",
    label: "Orchard",
  },
  {
    value: "littleIndia",
    label: "Little India",
  },
  {
    value: "bukitMerah",
    label: "Bukit Merah",
  },
  {
    value: "marinaBay",
    label: "Marina Bay",
  },
  {
    value: "tanglin",
    label: "Tanglin",
  },
  {
    value: "bukitPanjang",
    label: "Bukit Panjang",
  },
  {
    value: "sentosa",
    label: "Sentosa",
  },
  {
    value: "bukitTimah",
    label: "Bukit Timah",
  },
  {
    value: "woodlands",
    label: "Woodlands",
  },
  {
    value: "tiongBahru",
    label: "Tiong Bahru",
  },
  {
    value: "serangoon",
    label: "Serangoon",
  },
  {
    value: "clarkeQuay",
    label: "Clarke Quay",
  },
  {
    value: "choaChuKang",
    label: "Choa Chu Kang",
  },
  {
    value: "hollandVillage",
    label: "Holland Village",
  },
  {
    value: "chinatown",
    label: "Chinatown",
  },
  {
    value: "geylang",
    label: "Geylang",
  },
  {
    value: "tanjongPagar",
    label: "Tanjong Pagar",
  },
  {
    value: "bedok",
    label: "Bedok",
  },
  {
    value: "angMoKio",
    label: "Ang Mo Kio",
  },
  {
    value: "bishan",
    label: "Bishan",
  },
];

export const skillsOption = [
  {
    value: "leadership",
    label: "Leadership",
  },
  {
    value: "problemSolving",
    label: "Problem-Solving",
  },
  {
    value: "organisationAndPlanning",
    label: "Organisation & Planning",
  },
  {
    value: "communication",
    label: "Communication",
  },
  {
    value: "relationshipBuilding",
    label: "Relationship Building",
  },
  {
    value: "mentoring",
    label: "Mentoring",
  },
  {
    value: "teamwork",
    label: "Teamwork",
  },
  {
    value: "timeManagement",
    label: "Time Management",
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
