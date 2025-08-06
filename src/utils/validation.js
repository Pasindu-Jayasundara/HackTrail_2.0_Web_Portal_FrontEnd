import { userExistsByEmail } from "../api/api";

const levels = {
  0: "2024",
  1: "2023",
  2: "2022",
  3: "2021",
  4: "2020",
};

const validateLoginForm = (form) => {
  const err = {};

  if (form.username.trim() === "") {
    err.username = "This field is required";
  }

  if (form.password.trim() === "") {
    err.password = "This field is required";
  }

  return err;
};

const validateForm = async (form) => {
  const err = {};

  if (form.name.trim() === "") {
    err.name = "This field is required";
  }

  if (!validateEmail(form.email)) {
    err.email = "Enter a valid email";
  } else {
    try {
      const res = await userExistsByEmail(form.email);
      if (res?.userExist) {
        err.email = "Email already exists";
      }
    } catch (err) {
      err.email = "Error validating email";
    }
  }

  if (!validateTGNumber(form.tg)) {
    err.tg = "Enter a valid tg number";
  }

  if (!form.level || form.level === "") {
    err.level = "This field is required";
  }

  if (!form.gender || form.gender === "") {
    err.gender = "This field is required";
  }

  if (!validatePhoneNo(form.phone_no)) {
    err.phone_no = "Enter a valid phone number";
  }

  if (Object.keys(err).length === 0) {
    const [_, tgYearFromEmail, tgFromEmail] =
      form.email.match(/_(\d{4})(\d{4})@/) || [];
    const tgYearFromTGNumber = () => form.tg.split("/")[1];
    const tgFromTGNumber = () => form.tg.split("/")[2];
    const tgYearFromLevel = levels[form.level];

    if (
      !(
        tgYearFromEmail === tgYearFromTGNumber() &&
        tgYearFromEmail === tgYearFromLevel
      )
    ) {
      err.email = err.level = err.tg = "Invalid credentials";
    }

    if (!(tgFromEmail === tgFromTGNumber())) {
      err.email = err.tg = "Invalid credentials";
    }
  }

  return err;
};

const validatePhoneNo = (num) => /^07[0-9]{8}$/.test(num);
const validateTGNumber = (tg) => /^TG\/\d{4}\/\d{4}$/.test(tg);
const validateEmail = (email) =>
  /^[a-zA-Z]+_\d{8}@fot\.ruh\.ac\.lk$/.test(email);

export { validateForm, validateLoginForm };
