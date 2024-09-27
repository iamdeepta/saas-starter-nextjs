import DataTable from "@/components/common/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Blogs from "@/data/Blogs.json";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

interface SearchParams {}

const BlogPostsPage = ({ searchParams }: { searchParams: SearchParams }) => {
  const blogs = { ...Blogs };
  //   const { data, totalPage, currentPage, totalBlogs, limit } = blogs;
  console.log({ searchParams });

  return (
    <Suspense fallback={<Loader2 className="mr-2 h-4 w-4 animate-spin" />}>
      <section className="flex-1 p-4 lg:p-8">
        <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
          Blog Posts
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>{blogs?.totalBlogs} Entries Found</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={blogs} />
          </CardContent>
        </Card>
      </section>
    </Suspense>
  );
};

export default BlogPostsPage;
