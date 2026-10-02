import GetValidDate from "@/components/GetValidDate";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { CreateCommentSchema } from "@/types/courses/CommentType";
import { fakerEN as faker } from "@faker-js/faker";
import { useFormik } from "formik";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useAddComment, useGetComments } from "../pages/hooks/useComments";

const Comments = () => {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { data: comments, refetch: refetchComments } = useGetComments();
  const { mutateAsync: handleCreateComment, isPending: isCategoryCreating } =
    useAddComment();

  const {
    initialValues,
    dirty,
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    handleChange,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      comment: "",
      user_name: "",
      user_avatar: "",
    },
    validationSchema: CreateCommentSchema,
    onSubmit: async (values) => {
      await handleCreateComment(values);
      console.log(values);
      await refetchComments();
    },
  });

  useEffect(() => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    const avatar = faker.image.avatar();
    if (!currentUser) {
      setFieldValue("user_name", fullName);
      setFieldValue("user_avatar", avatar);
    } else {
      setFieldValue(
        "user_name",
        currentUser.first_name + " " + currentUser.last_name,
      );
      setFieldValue("user_avatar", currentUser.avatar_url || "");
    }
  }, []);

  return (
    <div className="flex w-full flex-col">
      {/* Comments */}
      <div className="mt-8 flex flex-col gap-2 px-4 md:mt-8 md:gap-5 md:px-0">
        <div className="text-foreground text-xl font-medium md:text-2xl">
          Comments
        </div>
        <div className="bg-card text-card-foreground border-border divide-border flex flex-col justify-between divide-y rounded-4xl border px-4 md:px-6">
          {/* card */}

          {comments?.map((comment, i) => {
            return (
              <div key={i} className="flex items-start gap-4 py-4 md:gap-6">
                {/* left */}
                <div>
                  <Image
                    src={
                      comment?.user_avatar ||
                      "https://prfteutwyqdfyoodyasu.supabase.co/storage/v1/object/public/usersPhotos/images-2.jpg"
                    }
                    alt="comment photo"
                    width={300}
                    height={300}
                    className="border-border h-12 min-h-12 w-12 min-w-12 rounded-full border object-cover object-center md:h-15 md:min-h-15 md:w-15 md:min-w-15"
                  />
                </div>

                {/* right */}
                <div>
                  <div className="text-foreground text-base font-semibold">
                    {comment.user_name ||
                      currentUser?.first_name + " " + currentUser?.last_name}
                  </div>
                  <div className="text-muted-foreground mt-1 text-xs font-medium">
                    {GetValidDate(comment.created_at).formattedDate}
                  </div>

                  <p className="text-card-foreground mt-3 text-sm leading-relaxed">
                    {comment.comment}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/*  Write a comment */}

      <div className="mt-5 px-4 md:px-0">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-end">
            <Field>
              <Textarea
                value={values.comment}
                onChange={handleChange}
                name="comment"
                placeholder="Write a comment..."
                rows={20}
                className="bg-card text-card-foreground border-border! focus-visible:ring-ring placeholder:text-muted-foreground h-35 rounded-4xl border p-4 drop-shadow-sm"
              />
            </Field>
            <div className="mt-6 flex gap-2">
              <Button
                variant={"outline"}
                type="button"
                size={"lg"}
                onClick={() => {
                  setFieldValue("comment", "");
                }}
              >
                Cancle
              </Button>
              <Button size={"lg"} type="submit" disabled={!dirty}>
                Submit Review <MoveRight className="size-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comments;
