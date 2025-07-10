"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/posts";
import { useToast } from "@/hooks/use-toast";

interface PostsEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  body: z.string().min(1, {
    message: "Body is required",
  }),
  author: z.string().min(1, {
    message: "Author is required",
  }),
  date: z.string().min(1, {
    message: "Date is required",
  }),
});

const PostEditPage = ({ params }: PostsEditPageProps) => {
  const { toast } = useToast();
  const [post, setPost] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      author: "",
      date: "",
    },
  });

  useEffect(() => {
    const loadPost = async () => {
      try {
        const resolvedParams = await params;
        const foundPost = posts.find((post) => post.id === resolvedParams.id);
        setPost(foundPost);

        if (foundPost) {
          form.reset({
            title: foundPost.title ?? "",
            body: foundPost.body ?? "",
            author: foundPost.author ?? "",
            date: foundPost.date ?? "",
          });
        }
      } catch (error) {
        console.error("Error loading post:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [params, form]);

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log({ data });
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <h3 className="text-2xl mb-4">Edit Post</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter title"
                    {...field}
                    className="bg-slate-100 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-orange-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter body"
                    {...field}
                    className="bg-slate-100 dark:bg-slate-500 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter date"
                    {...field}
                    className="bg-slate-100 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-orange-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full dark:bg-slate-800 dark:text-white">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PostEditPage;