import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, MessageSquare, FileText, Shield, Trash2, Ban } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'banned';
  joinedAt: string;
}

interface Thread {
  id: string;
  title: string;
  author: string;
  topic: string;
  createdAt: string;
  replies: number;
}

interface Post {
  id: string;
  content: string;
  author: string;
  threadTitle: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [users, setUsers] = useState<User[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    // Simulate API calls
    const mockUsers: User[] = [
      {
        id: '1',
        username: 'dev_sarah',
        email: 'sarah@example.com',
        role: 'user',
        status: 'active',
        joinedAt: '2024-01-10T10:00:00Z'
      },
      {
        id: '2',
        username: 'tech_enthusiast',
        email: 'tech@example.com',
        role: 'user',
        status: 'active',
        joinedAt: '2024-01-12T15:30:00Z'
      },
      {
        id: '3',
        username: 'design_guru',
        email: 'design@example.com',
        role: 'user',
        status: 'active',
        joinedAt: '2024-01-14T09:15:00Z'
      }
    ];

    const mockThreads: Thread[] = [
      {
        id: '1',
        title: 'Welcome to ThreadWave - Introduce Yourself!',
        author: 'admin',
        topic: 'general',
        createdAt: '2024-01-15T10:00:00Z',
        replies: 24
      },
      {
        id: '2',
        title: 'Best React Patterns for 2024',
        author: 'dev_sarah',
        topic: 'programming',
        createdAt: '2024-01-14T15:30:00Z',
        replies: 18
      }
    ];

    const mockPosts: Post[] = [
      {
        id: '1',
        content: 'Hi everyone! I\'m a frontend developer passionate about React...',
        author: 'dev_sarah',
        threadTitle: 'Welcome to ThreadWave',
        createdAt: '2024-01-15T11:30:00Z'
      },
      {
        id: '2',
        content: 'Welcome! This looks like a great platform for developers...',
        author: 'tech_enthusiast',
        threadTitle: 'Welcome to ThreadWave',
        createdAt: '2024-01-15T12:15:00Z'
      }
    ];

    setTimeout(() => {
      setUsers(mockUsers);
      setThreads(mockThreads);
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, [user, navigate]);

  const handleBanUser = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'active' ? 'banned' : 'active' }
        : u
    ));
    
    toast({
      title: "User status updated",
      description: "User access has been modified successfully.",
    });
  };

  const handleDeleteThread = (threadId: string) => {
    setThreads(threads.filter(t => t.id !== threadId));
    
    toast({
      title: "Thread deleted",
      description: "The thread has been removed successfully.",
    });
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
    
    toast({
      title: "Post deleted",
      description: "The post has been removed successfully.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">Manage users, threads, and content across the platform</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              {users.filter(u => u.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Threads</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{threads.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all topics
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
            <p className="text-xs text-muted-foreground">
              Community replies
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="threads">Threads</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{user.username}</h4>
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                          {user.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Joined: {formatDate(user.joinedAt)}
                      </p>
                    </div>
                    
                    <Button
                      variant={user.status === 'active' ? 'destructive' : 'default'}
                      size="sm"
                      onClick={() => handleBanUser(user.id)}
                    >
                      <Ban className="h-4 w-4 mr-1" />
                      {user.status === 'active' ? 'Ban' : 'Unban'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thread Management</CardTitle>
              <CardDescription>
                Monitor and moderate community threads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threads.map(thread => (
                  <div key={thread.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{thread.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{thread.topic}</Badge>
                        <span className="text-sm text-muted-foreground">
                          by {thread.author}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          • {thread.replies} replies
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Created: {formatDate(thread.createdAt)}
                      </p>
                    </div>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteThread(thread.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Post Management</CardTitle>
              <CardDescription>
                Review and moderate user posts and replies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts.map(post => (
                  <div key={post.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{post.author}</span>
                        <span className="text-sm text-muted-foreground">
                          in "{post.threadTitle}"
                        </span>
                      </div>
                      <p className="text-sm mb-2 line-clamp-2">{post.content}</p>
                      <p className="text-xs text-muted-foreground">
                        Posted: {formatDate(post.createdAt)}
                      </p>
                    </div>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;