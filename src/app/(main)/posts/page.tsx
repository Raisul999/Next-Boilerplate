import DynamicBreadcrumb from "@/components/Breadcrumb";
import PostsPagination from "@/components/posts/PostsPagination";
import PostsTable from "@/components/posts/PostsTable";

const PostsPage = () => {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Posts" }];
  return (
    <>
      <DynamicBreadcrumb items={breadcrumbItems} />
      <PostsTable />
      <PostsPagination />
    </>
  );
};

export default PostsPage;
