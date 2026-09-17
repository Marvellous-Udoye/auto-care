import { posts } from "@/constants/autocare";
import { Container, SectionHeading } from "@/components/external/autocare-shared";

export function AutocareBlog() {
  return (
    <section id="blog" className="section-animate bg-[#202020] py-[90px] pb-[155px] max-[700px]:py-[78px]">
      <Container>
        <SectionHeading eyebrow="Our Blog" title="What’s New?" />
        <div className="mt-[30px] mb-[58px] ml-auto h-px w-[calc(100%-125px)] bg-[#ec3042] max-[700px]:w-full" />
        <div className="grid grid-cols-3 gap-[18px] max-[1050px]:grid-cols-2 max-[700px]:grid-cols-1">
          {posts.map((post) => (
            <article className="relative overflow-hidden rounded-[10px] bg-[#f6f6f6] text-[#333]" key={post.title}>
              <img className="h-[252px] w-full object-cover grayscale" src={post.image} alt="" />
              <span className="absolute top-[218px] left-[34px] rounded-[5px] bg-[#ec3042] px-[27px] py-[17px] text-[13px] font-extrabold text-white">
                Latest Blog
              </span>
              <div className="px-[34px] pt-[50px] pb-8">
                <p className="flex justify-between gap-[18px] text-[13px] text-[#7d7d7d]">
                  {post.date}
                  <b>{post.author}</b>
                </p>
                <h3 className="my-[22px] min-h-[132px] text-[28px] font-extrabold leading-[1.22] text-[#333]">
                  {post.title}
                </h3>
                <small className="text-sm text-[#777]">{post.comments}</small>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
