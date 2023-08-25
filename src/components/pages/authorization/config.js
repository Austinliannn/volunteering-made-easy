import {
  skillsOption,
  locationsOption,
  inputField,
  inputPasswordField,
  selectorField,
  ruleField,
  fileField,
} from "../../shared/customForm/config";
import NewForm from "../../shared/customForm";

export const volunteerFormSet = [
  {
    name: "email",
    label: "Email",
    rule: ruleField(
      true,
      "Please input Email!",
      "email",
      "The input is not valid Email!"
    ),
    fieldType: inputField,
    dependencies: [],
  },
  {
    name: "password",
    label: "Password",
    rule: ruleField(true, "Please input Password!"),
    fieldType: inputPasswordField,
    dependencies: [],
  },
  {
    name: "confirm",
    label: "Confirm Password",
    rule: ruleField(true, "Please Confirm your Password!"),
    fieldType: inputPasswordField,
    dependencies: ["password"],
  },
  {
    name: "firstName",
    label: "First Name",
    rule: ruleField(true, "Please input First Name!"),
    fieldType: inputField,
    dependencies: [],
  },
  {
    name: "lastName",
    label: "Last Name",
    rule: ruleField(true, "Please input Last Name!"),
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
    name: "link",
    label: "Linkedin/Website",
    rule: ruleField(true, "Please input Linkedin/Website!"),
    fieldType: inputField,
    dependencies: [],
  },
  {
    name: "skill",
    label: "Skills",
    rule: ruleField(true, "Please input Skills!"),
    fieldType: selectorField(skillsOption, "multiple"),
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
    name: "image",
    label: "Upload Image",
    rule: ruleField(false, "Please Upload an Image!"),
    fieldType: fileField,
    dependencies: [],
  },
];

export const organizationFormSet = [
  {
    name: "email",
    label: "Email",
    rule: ruleField(
      true,
      "Please input Email!",
      "email",
      "The input is not valid Email!"
    ),
    fieldType: inputField,
    dependencies: [],
  },
  {
    name: "password",
    label: "Password",
    rule: ruleField(true, "Please input Password!"),
    fieldType: inputPasswordField,
    dependencies: [],
  },
  {
    name: "confirm",
    label: "Confirm Password",
    rule: ruleField(true, "Please Confirm your Password!"),
    fieldType: inputPasswordField,
    dependencies: ["password"],
  },
  {
    name: "organizationName",
    label: "Organization Name",
    rule: ruleField(true, "Please input First Name!"),
    fieldType: inputField,
    dependencies: [],
  },
  {
    name: "contact",
    label: "Contact",
    rule: ruleField(true, "Please input Contact!"),
    fieldType: inputField,
    dependencies: [],
  },
  {
    name: "link",
    label: "Link",
    rule: ruleField(true, "Please input Link!"),
    fieldType: inputField,
    dependencies: [],
  },
  {
    name: "address",
    label: "Address",
    rule: ruleField(true, "Please input Address!"),
    fieldType: inputField,
    dependencies: [],
  },
  {
    name: "image",
    label: "Upload Image",
    rule: ruleField(false, "Please Upload an Image!"),
    fieldType: fileField,
    dependencies: [],
  },
];

export const loginFormSet = [
  {
    name: "email",
    label: "Email",
    rule: ruleField(
      true,
      "Please input Email!",
      "email",
      "The input is not valid Email!"
    ),
    fieldType: inputField,
    dependencies: [],
  },
  {
    name: "password",
    label: "Password",
    rule: ruleField(true, "Please input Password!"),
    fieldType: inputPasswordField,
    dependencies: [],
  },
];

export const tabItems = (volunteerToggle, loginOnFinish, signUpOnFinish) => [
  {
    key: "1",
    label: `Login`,
    children: NewForm({
      name: "",
      onFinish: loginOnFinish,
      formSet: loginFormSet,
      submitText: "Log In",
    }),
  },
  {
    key: "2",
    label: `Sign Up`,
    children: volunteerToggle
      ? NewForm({
          name: "",
          onFinish: signUpOnFinish,
          formSet: volunteerFormSet,
          submitText: "Register",
        })
      : NewForm({
          name: "",
          onFinish: signUpOnFinish,
          formSet: organizationFormSet,
          submitText: "Register",
        }),
  },
];
