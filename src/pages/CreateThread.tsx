import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Send } from 'lucide-react';

const CreateThread = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const topics = [
    { value: 'general', label: 'General Discussion' },
    { value: 'technology', label: 'Technology' },
    { value: 'programming', label: 'Programming' },
    { value: 'design', label: 'Design' },
    { value: 'discussion', label: 'Open Discussion' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !topic) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields before creating your thread.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // await axios.post('/api/threads', { title, content, topic });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Thread created successfully!",
        description: "Your thread has been published and is now live.",
      });
      
      navigate('/threads');
    } catch (error) {
      toast({
        title: "Failed to create thread",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/threads')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Threads
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Create New Thread</h1>
        <p className="text-muted-foreground">Start a new conversation and connect with the community</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Thread Details</CardTitle>
          <CardDescription>
            Fill in the information below to create your thread
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Thread Title *</Label>
              <Input
                id="title"
                placeholder="Enter a compelling title for your thread"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="transition-smooth"
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">
                {title.length}/100 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic *</Label>
              <Select value={topic} onValueChange={setTopic} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic for your thread" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map(topicOption => (
                    <SelectItem key={topicOption.value} value={topicOption.value}>
                      {topicOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                placeholder="Share your thoughts, ask questions, or start a discussion..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="min-h-[200px] transition-smooth resize-none"
                maxLength={2000}
              />
              <p className="text-xs text-muted-foreground">
                {content.length}/2000 characters
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                type="submit" 
                className="gradient-primary text-primary-foreground border-0 shadow-glow hover:opacity-90 transition-smooth"
                disabled={loading}
              >
                {loading ? (
                  <>Creating...</>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Create Thread
                  </>
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/threads')}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">Community Guidelines</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Be respectful and constructive in your discussions</li>
          <li>• Use clear and descriptive titles</li>
          <li>• Choose the most appropriate topic for your thread</li>
          <li>• Search existing threads before creating duplicates</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateThread;