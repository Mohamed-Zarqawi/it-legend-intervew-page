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
        <div className="text-xl font-medium md:text-2xl">Comments</div>
        <div className="bg-card border-chart-1 flex flex-col justify-between divide-y rounded-sm px-4 md:px-6">
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
                    className="h-12 min-h-12 w-12 min-w-12 rounded-full object-cover object-center md:h-15 md:min-h-15 md:w-15 md:min-w-15"
                  />
                </div>

                {/* right */}
                <div>
                  <div className="text-chart-3 text-base font-medium">
                    {comment.user_name}
                  </div>
                  <div className="text-chart-2 mt-1 text-xs font-medium">
                    {GetValidDate(comment.created_at).formattedDate}
                  </div>

                  <p className="text-chart-2 mt-3 text-sm">{comment.comment}</p>
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
              placeholder="Write a comment"
              rows={20}
              className="bg-card h-35 rounded-sm border-0 drop-shadow-lg"
            />
          </Field>

          <Button
            size={"lg"}
            type="submit"
            disabled={!dirty}
            className="mt-6 bg-[#41B69D] px-10 py-5 hover:cursor-pointer hover:bg-[#41B67D]"
          >
            Submit Review <MoveRight className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
