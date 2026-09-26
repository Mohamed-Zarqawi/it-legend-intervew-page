import GetValidDate from "@/components/GetValidDate";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { CreateCommentSchema } from "@/types/CommentType";
import { fakerEN as faker } from "@faker-js/faker";
import { useFormik } from "formik";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useAddComment, useGetComments } from "../pages/hooks/useComments";

const Comments = () => {
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
    console.log(avatar);
    setFieldValue("user_name", fullName);
    setFieldValue("user_avatar", avatar);
  }, []);

  return (
    <div>
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
                    {comment.user_name}
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

      <div className="mt-8 px-4 md:px-0">
        <form onSubmit={handleSubmit}>
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

          <Button
            size={"lg"}
            type="submit"
            disabled={!dirty}
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 px-10 py-5 transition-colors hover:cursor-pointer"
          >
            Submit Review <MoveRight className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
