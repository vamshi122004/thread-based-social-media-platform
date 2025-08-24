import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Heart, Clock, Search, Filter } from 'lucide-react';

interface Thread {
  id: string;
  title: string;
  content: string;
  author: string;
  topic: string;
  createdAt: string;
  replies: number;
  likes: number;
}

const ThreadList = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [loading, setLoading] = useState(true);

  const topics = ['all', 'technology', 'programming', 'design', 'general', 'discussion'];

  useEffect(() => {
    // Simulate API call
    const mockThreads: Thread[] = [
      {
        id: '1',
        title: 'Welcome to ThreadWave - Introduce Yourself!',
        content: 'This is a community space where we can all connect and share ideas. Feel free to introduce yourself and tell us what brings you here!',
        author: 'admin',
        topic: 'general',
        createdAt: '2024-01-15T10:00:00Z',
        replies: 24,
        likes: 15
      },
      {
        id: '2',
        title: 'Best React Patterns for 2024',
        content: 'What are the most effective React patterns you\'ve been using this year? Let\'s discuss modern approaches to component architecture.',
        author: 'dev_sarah',
        topic: 'programming',
        createdAt: '2024-01-14T15:30:00Z',
        replies: 18,
        likes: 32
      },
      {
        id: '3',
        title: 'UI/UX Design Trends Discussion',
        content: 'Exploring the latest trends in user interface and experience design. What do you think will dominate in the coming months?',
        author: 'design_guru',
        topic: 'design',
        createdAt: '2024-01-14T09:15:00Z',
        replies: 12,
        likes: 28
      },
      {
        id: '4',
        title: 'The Future of AI in Technology',
        content: 'How do you see artificial intelligence shaping the technology landscape? Share your thoughts and predictions.',
        author: 'tech_enthusiast',
        topic: 'technology',
        createdAt: '2024-01-13T14:45:00Z',
        replies: 35,
        likes: 42
      }
    ];

    setTimeout(() => {
      setThreads(mockThreads);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = selectedTopic === 'all' || thread.topic === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-muted rounded w-full mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Community Threads</h1>
        <p className="text-muted-foreground">Discover and join conversations that matter to you</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search threads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-[150px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map(topic => (
                <SelectItem key={topic} value={topic}>
                  {topic.charAt(0).toUpperCase() + topic.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Link to="/create-thread">
            <Button className="gradient-primary text-primary-foreground border-0">
              New Thread
            </Button>
          </Link>
        </div>
      </div>

      {/* Thread List */}
      <div className="space-y-4">
        {filteredThreads.length > 0 ? (
          filteredThreads.map(thread => (
            <Card key={thread.id} className="hover:shadow-card transition-smooth cursor-pointer group">
              <Link to={`/thread/${thread.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-smooth line-clamp-2">
                        {thread.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {thread.topic}
                        </Badge>
                        <span className="text-sm text-muted-foreground">by {thread.author}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="line-clamp-2 mb-4">
                    {thread.content}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{thread.replies}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{thread.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(thread.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No threads found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or create a new thread to get the conversation started.
              </p>
              <Link to="/create-thread">
                <Button className="gradient-primary text-primary-foreground border-0">
                  Create Thread
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ThreadList;