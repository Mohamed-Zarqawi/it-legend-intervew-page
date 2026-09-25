import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { MoveRight } from "lucide-react";
import Image from "next/image";

const Comments = () => {
  const commentsMenu = [
    {
      name: "Ahmed Mohsen",
      date: "Oct 10, 2021",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Loremm ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      photo: "/images/images-2.jpg",
    },

    {
      name: "Mahmoud Sayed",
      date: "Sep 10, 2022",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Loremm ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      photo: "/images/course-45.jpg",
    },
    {
      name: "Karim Mohamed",
      date: "Jun 20, 2019",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Loremm ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      photo: "/images/images-3.jpg",
    },
  ];
  return (
    <div>
      {/* Comments */}
      <div className="mt-8 flex flex-col gap-2 px-4 md:mt-8 md:gap-5 md:px-0">
        <div className="text-xl font-medium md:text-2xl">Comments</div>
        <div className="bg-card border-chart-1 flex flex-col justify-between divide-y rounded-sm px-4 md:px-6">
          {/* card */}

          {commentsMenu.map((comment, i) => {
            return (
              <div key={i} className="flex items-start gap-4 py-4 md:gap-6">
                {/* left */}
                <div>
                  <Image
                    src={comment.photo}
                    alt="comment photo"
                    width={300}
                    height={300}
                    className="h-12 min-h-12 w-12 min-w-12 rounded-full object-cover object-center md:h-15 md:min-h-15 md:w-15 md:min-w-15"
                  />
                </div>

                {/* right */}
                <div>
                  <div className="text-chart-3 text-base font-medium">
                    {comment.name}
                  </div>
                  <div className="text-chart-2 mt-1 text-xs font-medium">
                    {comment.date}
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
        <Field>
          <Textarea
            name="comment"
            placeholder="Write a comment"
            rows={20}
            className="bg-card h-35 rounded-sm border-0 drop-shadow-lg"
          />
        </Field>

        <Button
          size={"lg"}
          className="mt-6 bg-[#41B69D] px-10 py-5 hover:cursor-pointer hover:bg-[#41B67D]"
        >
          Submit Review <MoveRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default Comments;
