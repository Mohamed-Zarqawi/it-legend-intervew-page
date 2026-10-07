import { EllipsisVertical, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import GetValidDate from "@/components/GetValidDate";

import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useGetCurrentUser } from "@/features/auth/pages/hooks/useAuth";
import { CreateCommentSchema } from "@/types/courses/CommentType";
import { fakerEN as faker } from "@faker-js/faker";
import { useFormik } from "formik";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import { toast } from "sonner";
import {
  useAddComment,
  useDeleteComment,
  useGetComments,
} from "../pages/hooks/useComments";

const fallbackName = `${faker.person.firstName()} ${faker.person.lastName()}`;
const fallbackAvatar = faker.image.avatar();
const Comments = () => {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();
  const { data: comments, refetch: refetchComments } = useGetComments();
  const { mutateAsync: handleCreateComment, isPending: isCommentCreating } =
    useAddComment();

  const { mutateAsync: handleDeleteComment, isPending: isCommentDeleting } =
    useDeleteComment();

  // const { mutateAsync: handleUpdateComment, isPending: isCommentUpdating } =
  //   useUpdateComment();

  const initialValues = useMemo(() => {
    const name = currentUser
      ? `${currentUser.first_name || ""} ${currentUser.last_name || ""}`.trim()
      : fallbackName;

    const avatar = currentUser?.avatar_url || fallbackAvatar;

    return {
      comment: "",
      user_name: name,
      user_avatar: avatar,
    };
  }, [currentUser]);

  const {
    dirty,
    values,
    errors,
    touched,
    resetForm,
    handleSubmit,
    setFieldValue,
    handleChange,
  } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: CreateCommentSchema,
    onSubmit: async (values) => {
      await handleCreateComment(values);
      await refetchComments();
      resetForm({ values: { ...values, comment: "" } });
    },
  });

  // useEffect(() => {
  //   const firstName = faker.person.firstName();
  //   const lastName = faker.person.lastName();
  //   const fullName = `${firstName} ${lastName}`;
  //   const avatar = faker.image.avatar();
  //   if (!currentUser) {
  //     setFieldValue("user_name", fullName);
  //     setFieldValue("user_avatar", avatar);
  //   } else {
  //     setFieldValue(
  //       "user_name",
  //       currentUser.first_name + " " + currentUser.last_name,
  //     );
  //     setFieldValue("user_avatar", currentUser.avatar_url || "");
  //   }
  // }, []);

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
              <div
                key={i}
                className="flex items-center justify-between gap-4 py-4 md:gap-6"
              >
                {/* left */}
                <div className="flex w-full items-start gap-4 md:gap-6">
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

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size={"icon"}>
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => {
                          if (
                            comment.id !== 1 &&
                            comment.id !== 2 &&
                            comment.id !== 3
                          ) {
                            handleDeleteComment(comment.id);
                          } else {
                            toast.error(
                              "This comment for interview purposes. You cannot delete this comment.",
                            );
                          }
                        }}
                      >
                        <TrashIcon />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                errors={errors}
                touched={touched}
                placeholder="Write a comment..."
                rows={20}
                className="bg-card text-card-foreground border-border! focus-visible:ring-ring placeholder:text-muted-foreground h-35 rounded-4xl border p-4 drop-shadow-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (values.comment.trim() && !isCommentCreating) {
                      handleSubmit();
                    }
                  }
                }}
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
              <Button
                size={"lg"}
                type="submit"
                pendingText="Submitting"
                isPending={isCommentCreating}
                disabled={!dirty || !values.comment.trim()}
              >
                Submit Comment <MoveRight className="size-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comments;
