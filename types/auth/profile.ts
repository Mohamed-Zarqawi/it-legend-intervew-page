import { isValidPhoneNumber } from "libphonenumber-js";
import * as y from "yup";

export const updateProfileSchema = y.object({
  first_name: y.string().required(),
  last_name: y.string().notRequired(),
  phoneNumber: y
    .string()
    .test(
      "is-valid-phone",
      "Invalid phone number for the selected country",
      function (value) {
        if (!value) return true;
        const { phoneCode } = this.parent;
        if (!phoneCode) return false;
        try {
          const fullPhoneNumber = `+${phoneCode}${value}`;
          return isValidPhoneNumber(fullPhoneNumber);
        } catch (error) {
          return false;
        }
      },
    ),
  gender: y.string().oneOf(["male", "female"]).notRequired(),
  birthday: y.string().notRequired(),
});

export type reqUpdateProfile = y.InferType<typeof updateProfileSchema>;
