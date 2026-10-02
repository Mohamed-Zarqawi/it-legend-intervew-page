"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";

import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { updateProfileSchema } from "@/types/auth/profile";
import { getChangedValues } from "@/utils/getChangedValues";
import { Country } from "country-state-city";
import { useUpdateProfile } from "../hooks/useProfile";

const ALL_COUNTRIES = Country.getAllCountries();

const ProfilePage = () => {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { mutateAsync: handleUpdateProfile, isPending: isProfileUpdating } =
    useUpdateProfile();

  type ProfileFormValues = {
    first_name: string;
    last_name: string;
    phoneNumber: string;
    gender: "male" | "female" | null;
    birthday: string | null;
    phoneCode: string;
  };
  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldTouched,
    handleChange,
    setFieldValue,
    initialValues,
    dirty,
  } = useFormik<ProfileFormValues>({
    enableReinitialize: true,
    initialValues: {
      first_name: currentUser?.first_name || "",
      last_name: currentUser?.last_name || "",
      phoneNumber: currentUser?.phoneNumber || "",
      phoneCode: currentUser?.phoneCode || "",
      gender: currentUser?.gender || null,
      birthday: currentUser?.birthday || null,
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values) => {
      if (!currentUser) return;
      const changedValues = getChangedValues(values, initialValues);
      await handleUpdateProfile({
        userId: currentUser?.id,
        body: changedValues,
      });
    },
  });

  const isLoading = isCurrentUserLoading || !currentUser;

  return (
    <div className="mx-10 my-10">
      <div className="text-foreground text-2xl md:text-3xl">PROFILE</div>

      {/* contact information */}
      <form onSubmit={handleSubmit}>
        <div className="border-border bg-card mt-6 flex h-fit w-full flex-col rounded-3xl border px-6 py-6 md:mt-10 md:px-8 md:py-10">
          <div className="text-base">Contact Information</div>
          <div className="mt-5 flex flex-col gap-6 md:flex-row md:gap-4">
            <div>
              <Input
                name="email"
                type="text"
                value={currentUser?.email}
                onChange={handleChange}
                className="md:w-100!"
                readOnly
                label="Email"
                errors={errors}
                touched={touched}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        {/* personal information */}

        <div className="border-border bg-card mt-6 flex h-fit w-full flex-col rounded-3xl border px-6 py-6 md:mt-6 md:px-8 md:py-10">
          <div className="text-base">Personal Information</div>
          <div className="mt-5 flex flex-col gap-6 md:gap-4">
            <div className="flex flex-col gap-6 md:flex-row md:gap-4">
              {/* first name */}
              <div>
                <Input
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  isRequired={true}
                  value={values.first_name}
                  onChange={handleChange}
                  className="md:w-100!"
                  errors={errors}
                  touched={touched}
                  isLoading={isLoading}
                  aria-invalid={!!errors.first_name && !!touched.first_name}
                />
              </div>
              {/* last name */}
              <div>
                <Input
                  label="Last Name"
                  id="last_name"
                  name="last_name"
                  value={values.last_name}
                  onChange={handleChange}
                  className="md:w-100!"
                  errors={errors}
                  touched={touched}
                  isLoading={isLoading}
                  aria-invalid={!!errors.last_name && !!touched.last_name}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Information */}

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="submit"
            variant="default"
            disabled={!dirty || isProfileUpdating}
            isPending={isProfileUpdating}
            pendingText="Updating"
            className="hidden md:flex"
          >
            Update Profile
          </Button>
        </div>
        <Button
          type="submit"
          variant="default"

          size={"none"}
          disabled={!dirty || isProfileUpdating}
          isPending={isProfileUpdating}
          pendingText="Updating"
          className="flex md:hidden"
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
};
export default ProfilePage;
