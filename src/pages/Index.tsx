import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Users, Zap, ArrowRight } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Connect Through Conversations
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Join ThreadWave, where meaningful discussions happen. Share ideas, ask questions, 
              and connect with a vibrant community of thinkers and creators.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link to="/threads">
                  <Button size="lg" className="gradient-primary text-primary-foreground border-0 shadow-glow">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Browse Threads
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="gradient-primary text-primary-foreground border-0 shadow-glow">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose ThreadWave?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the next generation of online discussions with features designed for meaningful connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-card hover:shadow-lg transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Rich Discussions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Engage in threaded conversations that keep discussions organized and easy to follow.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-lg transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Active Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with like-minded individuals across various topics and interests.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-lg transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Real-time Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Stay connected with live notifications and real-time conversation updates.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Join the Conversation?</h2>
              <p className="text-muted-foreground mb-8">
                Create your account today and become part of our growing community.
              </p>
              <Link to="/register">
                <Button size="lg" className="gradient-primary text-primary-foreground border-0 shadow-glow">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
