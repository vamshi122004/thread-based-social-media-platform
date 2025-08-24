import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuths } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Heart, MessageCircle, Send, Clock } from "lucide-react";

interface Post {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

interface Thread {
  id: string;
  title: string;
  content: string;
  author: string;
  topic: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

const ThreadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuths();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newReply, setNewReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Simulate API call
    const mockThread: Thread = {
      id: id || "1",
      title: "Welcome to ThreadWave - Introduce Yourself!",
      content:
        "This is a community space where we can all connect and share ideas. Feel free to introduce yourself and tell us what brings you here! We're excited to have you as part of our growing community.",
      author: "admin",
      topic: "general",
      createdAt: "2024-01-15T10:00:00Z",
      likes: 15,
      isLiked: false,
    };

    const mockPosts: Post[] = [
      {
        id: "1",
        content:
          "Hi everyone! I'm a frontend developer passionate about React and modern web technologies. Looking forward to sharing knowledge and learning from this community!",
        author: "dev_sarah",
        createdAt: "2024-01-15T11:30:00Z",
        likes: 8,
        isLiked: false,
      },
      {
        id: "2",
        content:
          "Welcome! This looks like a great platform for developers to connect. I'm particularly interested in discussing best practices and emerging trends.",
        author: "tech_enthusiast",
        createdAt: "2024-01-15T12:15:00Z",
        likes: 5,
        isLiked: true,
      },
      {
        id: "3",
        content:
          "Excited to be here! I'm a UI/UX designer and always love collaborating with developers. This seems like the perfect place for that.",
        author: "design_guru",
        createdAt: "2024-01-15T13:45:00Z",
        likes: 12,
        isLiked: false,
      },
    ];

    setTimeout(() => {
      setThread(mockThread);
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " at " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const handleLike = async (postId: string, isThread = false) => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to like posts.",
        variant: "destructive",
      });
      return;
    }

    if (isThread && thread) {
      setThread({
        ...thread,
        likes: thread.isLiked ? thread.likes - 1 : thread.likes + 1,
        isLiked: !thread.isLiked,
      });
    } else {
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                isLiked: !post.isLiked,
              }
            : post
        )
      );
    }

    toast({
      title: "👍 Nice!",
      description: "Your reaction has been recorded.",
    });
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to post replies.",
        variant: "destructive",
      });
      return;
    }

    if (!newReply.trim()) return;

    setSubmitting(true);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newPost: Post = {
        id: Date.now().toString(),
        content: newReply,
        author: user.username,
        createdAt: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      };

      setPosts([...posts, newPost]);
      setNewReply("");

      toast({
        title: "Reply posted!",
        description: "Your response has been added to the thread.",
      });
    } catch (error) {
      toast({
        title: "Failed to post reply",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse space-y-6">
          <div className="h-4 bg-muted rounded w-20"></div>
          <div className="h-8 bg-muted rounded w-3/4"></div>
          <div className="h-32 bg-muted rounded"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <h1 className="text-2xl font-bold mb-4">Thread not found</h1>
        <Button onClick={() => navigate("/threads")}>Back to Threads</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => navigate("/threads")}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Threads
      </Button>

      {/* Main Thread */}
      <Card className="mb-6 shadow-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-3">{thread.title}</CardTitle>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {thread.author[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{thread.author}</span>
                  <Badge variant="secondary">{thread.topic}</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-foreground mb-4 leading-relaxed">
            {thread.content}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatDate(thread.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{posts.length} replies</span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLike(thread.id, true)}
              className={`flex items-center gap-1 ${
                thread.isLiked ? "text-red-500" : ""
              }`}
            >
              <Heart
                className={`h-4 w-4 ${thread.isLiked ? "fill-current" : ""}`}
              />
              <span>{thread.likes}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Replies */}
      <div className="space-y-4 mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Replies ({posts.length})
        </h2>

        {posts.map((post) => (
          <Card key={post.id} className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {post.author[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{post.author}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    {post.content}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1 ${
                    post.isLiked ? "text-red-500" : ""
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`}
                  />
                  <span>{post.likes}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reply Form */}
      {user ? (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Add a Reply</CardTitle>
            <CardDescription>
              Share your thoughts on this thread
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReply} className="space-y-4">
              <Textarea
                placeholder="Write your reply..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                className="min-h-[100px] transition-smooth resize-none"
                maxLength={1000}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {newReply.length}/1000 characters
                </p>
                <Button
                  type="submit"
                  className="gradient-primary text-primary-foreground border-0"
                  disabled={submitting || !newReply.trim()}
                >
                  {submitting ? (
                    <>Posting...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Post Reply
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-card text-center">
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">
              Please log in to participate in this thread
            </p>
            <Button
              onClick={() => navigate("/login")}
              className="gradient-primary text-primary-foreground border-0"
            >
              Log In
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ThreadDetail;
