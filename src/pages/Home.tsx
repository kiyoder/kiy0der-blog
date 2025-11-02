import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Tag } from 'lucide-react';
import { getAllPostsMeta } from '@/lib/posts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Home() {
  const posts = getAllPostsMeta();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 overflow-visible"
        >
          <h1 className="text-5xl font-bold leading-[1.2] inline-block pb-1 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Welcome to My Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Thoughts on web development, React, and modern technologies
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
        >
          {posts.map((post) => (
            <motion.div key={post.slug} variants={item}>
              <Link to={`/post/${post.slug}`} className="block h-full">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:border-primary/50">
                  <CardHeader>
                    <CardTitle className="text-2xl hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{post.description}</p>
                    {post.tags.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">No posts yet. Stay tuned!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
