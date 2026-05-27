import { Fragment } from "react";
import { MdStarRate } from "react-icons/md";

const star = (
  <Fragment>
    <div className="flex text-yellow-500">
      <MdStarRate />
      <MdStarRate />
      <MdStarRate />
      <MdStarRate />
      <MdStarRate />
    </div>
  </Fragment>
);

const Comments = [
  {
    star: star,
    comments:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ab fuga odit molestiae ipsam, nam eum hic assumenda quod dicta saepe.",
    image:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711544711/FrambegTech/HOME%20PAGE/CUSTOMERS/Nathaniel_z7hnaj.jpg",
    name: "Nathaniel Owusu",
    id: 1,
  },
  {
    star: star,
    comments:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ab fuga odit molestiae ipsam, nam eum hic assumenda quod dicta saepe.",
    image:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711542323/FrambegTech/HOME%20PAGE/CUSTOMERS/Paul_2_cohqje.jpg",
    name: "Paul Yeboah Asamoah",
    id: 2,
  },
  {
    star: star,
    comments:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ab fuga odit molestiae ipsam, nam eum hic assumenda quod dicta saepe",
    image:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711542311/FrambegTech/HOME%20PAGE/CUSTOMERS/Kusi_oe96vq.jpg",
    name: "Isaac Kusi",
    id: 3,
  },
  {
    star: star,
    comments:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ab fuga odit molestiae ipsam, nam eum hic assumenda quod dicta saepe",
    image:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711542311/FrambegTech/HOME%20PAGE/CUSTOMERS/Dennis_eojd3y.jpg",
    name: "Dennis Owusu",
    id: 4,
  },
  {
    star: star,
    comments:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ab fuga odit molestiae ipsam, nam eum hic assumenda quod dicta saepe",
    image:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711542318/FrambegTech/HOME%20PAGE/CUSTOMERS/Marina_xgou4f.jpg",
    name: "Marina Opoku Brefo",
    id: 5,
  },
  {
    star: star,
    comments:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ab fuga odit molestiae ipsam, nam eum hic assumenda quod dicta saepe",
    image:
      "https://res.cloudinary.com/dmdnq9vh8/image/upload/v1711544711/FrambegTech/HOME%20PAGE/CUSTOMERS/Nathaniel_z7hnaj.jpg",
    name: "Nathaniel Owusu",
    id: 6,
  },
];

const CustomerComments = () => {
  return (
    <Fragment>
      <section className="mb-8 mx-3 lg:mx-0">
        <div className="lg:w-4/5 lg:m-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 opacity-90">
            What is everyone saying?
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Comments.map((Comment) => (
              <div
                key={Comment.id}
                className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={Comment.image}
                      alt={Comment.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{Comment.name}</h3>
                    <div className="text-sm text-gray-500">{Comment.star}</div>
                  </div>
                </div>
                <p className="text-gray-700 text-base">{Comment.comments}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default CustomerComments;
