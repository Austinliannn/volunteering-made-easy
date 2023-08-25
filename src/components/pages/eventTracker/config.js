import {
  causesOption,
  locationsOption,
  inputField,
  selectorField,
  textAreaField,
  ruleField,
  fileField,
} from "../../shared/customForm/config";

export const currentEventColumn = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Volunteers",
    dataIndex: "volunteers",
    key: "volunteers",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "In-Charge",
    dataIndex: "inCharge",
    key: "inCharge",
  },
  {
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
  },
];

export const completedEventColumn = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
  },
];

export const formSet = [
  {
    name: "eventName",
    label: "Event Name",
    rule: ruleField(true, "Please input Event Name!"),
    fieldType: inputField,
    dependencies: [],
  },
  {
    name: "cause",
    label: "Cause",
    rule: ruleField(true, "Please input Cause!"),
    fieldType: selectorField(causesOption),
    dependencies: [],
  },
  {
    name: "startDate",
    label: "Start Date",
    rule: ruleField(true, "Please input Start Date!"),
    fieldType: inputField,
    dependencies: [],
  },
  {
    name: "endDate",
    label: "End Date",
    rule: ruleField(true, "Please input End Date!"),
    fieldType: inputField,
    dependencies: [],
  },
  {
    name: "inCharge",
    label: "In-Charge",
    rule: ruleField(true, "Please input In-Charge!"),
    fieldType: inputField,
    dependencies: [],
  },
  {
    name: "contact",
    label: "Contact Number",
    rule: ruleField(true, "Please input Contact!"),
    fieldType: inputField,
    dependencies: [],
  },
  {
    name: "location",
    label: "Location",
    rule: ruleField(true, "Please input Location!"),
    fieldType: selectorField(locationsOption, "multiple"),
    dependencies: [],
  },
  {
    name: "description",
    label: "Description",
    rule: ruleField(true, "Please input Description!"),
    fieldType: textAreaField,
    dependencies: [],
  },
  {
    name: "eventImage",
    label: "Event Image",
    rule: ruleField(false, "Please upload an Image!"),
    fieldType: fileField,
    dependencies: [],
  },
];
