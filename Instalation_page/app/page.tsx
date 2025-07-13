"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Music, 
  Brain, 
  MessageCircle, 
  Download, 
  Play, 
  Headphones, 
  Sparkles, 
  Chrome,
  Github,
  Star,
  ArrowRight,
  Volume2,
  Mic,
  Zap,
  Users,
  Shield,
  Smartphone,
  Globe,
  Heart,
  TrendingUp,
  CheckCircle,
  ExternalLink,
  BotIcon,
  LightbulbIcon,
  RibbonIcon,
  Heading1Icon,
  HeadphonesIcon,
  ZapIcon,
  LayoutDashboardIcon,
} from 'lucide-react';
export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const features = [
    {
      icon: <Play className="w-8 h-8" />,
      title: "Instant Music Control",
      description: "Type '-play bohemian rhapsody' and watch the magic happen. Direct Spotify integration for seamless playback.",
      demo: "-play bohemian rhapsody",
      gradient: "from-emerald-400 to-cyan-400"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Smart Mood Detection",
      description: "Tell it 'I'm feeling energetic' or 'play something sad' - our AI understands your emotional state.",
      demo: "I'm feeling chill, play something relaxing",
      gradient: "from-purple-400 to-pink-400"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Memory-Powered Conversations",
      description: "LangChain's ConversationBufferMemory ensures contextual, intelligent discussions about your music.",
      demo: "What was that song you played earlier?",
      gradient: "from-blue-400 to-indigo-400"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI Chat Integration",
      description: "Full ChatGPT and Gemini 2.0 integration for conversations beyond music - ask anything!",
      demo: "Tell me about the history of rock music",
      gradient: "from-orange-400 to-red-400"
    },
    {
      icon: <Volume2 className="w-8 h-8" />,
      title: "Beautiful Now Playing",
      description: "Stunning interface displaying current track with album artwork and playback controls.",
      demo: "Now playing: Bohemian Rhapsody",
      gradient: "from-pink-400 to-rose-400"
    },
    {
      icon: <Chrome className="w-8 h-8" />,
      title: "Browser Extension",
      description: "Runs directly in your Chrome toolbar - no separate apps needed. Always accessible.",
      demo: "Click extension icon to start",
      gradient: "from-teal-400 to-green-400"
    }
  ];

  const stats = [
    { icon: <LightbulbIcon />, number: "100%", label: "Open Source Project" },
    { icon: <BotIcon />, number: "3", label: "APIs Integrated" },
    { icon: <HeadphonesIcon />, number: "20+", label: "Songs Queried via AI" },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="/logo.jpg"
                  alt="Chatify Logo"
                  className="w-28 h-12 rounded-2xl pt-2 object-cover"
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">Where Conversations Turn into Music</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
                <a
                  href="https://github.com/Nanthan-s-Nair/Chatify"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </a>
                <a href="/Chatify_Extension.zip" download>
                  <Button className="bg-gradient-to-r from-spotify-green to-emerald-500 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </a>
            </nav>
          </div>
        </div>
      </header>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
                <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
                  Music Meets
                </span>
                <br />
                <span className="bg-gradient-to-r from-spotify-green to-emerald-500 bg-clip-text text-transparent">
                  Intelligence
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                  From thought to track in seconds. Chatify makes every music request conversational and personalized.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href="/Chatify_Extension.zip" download>
                  <Button size="lg" className="bg-gradient-to-r from-spotify-green to-emerald-500 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <Download className="w-5 h-5 mr-2" />
                    Download Extension
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2 text-spotify-green">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-2xl opacity-20"></div>
                <Card className="relative bg-white/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="font-medium">Chatify</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        Online
                      </Badge>
                    </div>
                  </CardHeader>
                <CardContent className="p-6 space-y-4 h-80 overflow-y-auto">
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-xs shadow-lg">
                      Hey! I'm feeling like a Giga Chad today 🔥
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md max-w-xs shadow-lg">
                      Perfect energy! 🎵 I can feel your vibe. Playing "MetaMorphosis" by InterWorld - this should get you moving! 
                      <div className="mt-2 p-2 bg-white rounded-lg border">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded"></div>
                          <div>
                            <div className="text-xs font-medium">Now Playing</div>
                            <div className="text-xs text-gray-500">MetaMorphosis</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-xs shadow-lg">
                      -play never gonna give you up
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md max-w-xs shadow-lg">
                      🎶 Switching to "Never Gonna Give You Up" by Rick Astley! A timeless '80s hit that became iconic thanks to the internet's favorite prank — the Rickroll.
                      <div className="mt-2 p-2 bg-white rounded-lg border">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-yellow-500 rounded"></div>
                          <div>
                            <div className="text-xs font-medium">Now Playing</div>
                            <div className="text-xs text-gray-500">Never Gonna Give You Up</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for the
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Perfect Music Experience</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let Chatify Find the Perfect Track for Your Mood 🎶.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                    activeTab === index 
                      ? 'border-purple-200 bg-white shadow-xl scale-105' 
                      : 'border-gray-100 bg-white/50 hover:border-gray-200'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 mb-3">{feature.description}</p>
                      <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 font-mono">
                        {feature.demo}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-2xl opacity-20"></div>
              <Card className="relative bg-white shadow-2xl rounded-3xl overflow-hidden border-0">
                <CardContent className="p-8">
                  <div className={`transition-all duration-500 ${activeTab !== undefined ? 'opacity-100' : 'opacity-0'}`}>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${features[activeTab]?.gradient} text-white flex items-center justify-center mb-6 shadow-lg`}>
                      {features[activeTab]?.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{features[activeTab]?.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{features[activeTab]?.description}</p>
                    <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-purple-500">
                      <p className="text-sm text-gray-500 mb-1">Try saying:</p>
                      <p className="font-mono text-gray-800">{features[activeTab]?.demo}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Get Started in
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> 3 Easy Steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Download & Install",
                description: "Get the Chrome extension from download link and install it in seconds",
                icon: <Download className="w-8 h-8" />,
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "02",
                title: "Connect Spotify",
                description: "Authenticate with your Spotify account using  secure OAuth integration",
                icon: <Zap className="w-8 h-8" />,
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "03",
                title: "Start Chatting",
                description: "Begin conversing with your AI music companion and discover new ways to enjoy music",
                icon: <MessageCircle className="w-8 h-8" />,
                color: "from-green-500 to-emerald-500"
              }
            ].map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.step}
                </div>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.color} text-white flex items-center justify-center shadow-xl`}>
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 right-[-50%] w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="relative w-full bg-black overflow-hidden py-6">
        <div className="marquee flex w-max animate-marquee">
          {[1, 2].map((loop) => (
            <div key={loop} className="flex">
              <img src="/ss1.jpeg" alt="ss1" className="h-52 w-auto object-cover shrink-0" />
              <img src="/ss2.jpeg" alt="ss2" className="h-52 w-auto object-cover shrink-0" />
              <img src="/ss3.jpeg" alt="ss3" className="h-52 w-auto object-cover shrink-0" />
              <img src="/ss5.jpg" alt="ss3" className="h-52 w-auto object-cover shrink-0" />
              <img src="/ss6.jpg" alt="ss3" className="h-52 w-auto object-cover shrink-0" />
            </div>
          ))}
        </div>
      </div>
      <footer className="bg-black text-white py-6">
          <div className="border-t border-gray-800 pt-2 flex flex-col items-center justify-center text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Chatify. Built with ❤️ for music lovers.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
            </div>
          </div>
      </footer>
    </div>
  );
}