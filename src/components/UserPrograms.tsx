import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronRight,
  Dumbbell,
  Sparkles,
  Users,
  Clock,
  AppleIcon,
  ShieldIcon,
} from "lucide-react";
import { USER_PROGRAMS } from "@/constants";

const UserPrograms = () => {
  return (
    <div className="w-full pt-16 pb-24 relative">
      <div className="container mx-auto max-w-6xl px-4">
        {/* HEADER */}
        <div className="bg-gradient-to-tr from-[#0f1115]/70 to-[#1a1f29]/70 backdrop-blur-md border border-[#3d5afe]/20 rounded-2xl overflow-hidden mb-16 shadow-lg">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#3d5afe]/30">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#3d5afe] animate-pulse"></div>
              <span className="text-sm text-[#3d5afe] font-medium uppercase tracking-wide">
                Program Gallery
              </span>
            </div>
            <div className="text-sm text-[#a1a6b0]">Featured Plans</div>
          </div>

          {/* Header Content */}
          <div className="p-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              <span>AI-Generated </span>
              <span className="text-[#3d5afe]">Programs</span>
            </h2>
            <p className="text-lg text-[#a1a6b0] max-w-xl mx-auto mb-12">
              Explore personalized fitness plans created by our AI assistant for other users
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-16 font-mono">
              <div className="flex flex-col items-center">
                <p className="text-3xl text-[#3d5afe] font-semibold">500+</p>
                <p className="text-xs text-[#a1a6b0] uppercase tracking-wide mt-1">PROGRAMS</p>
              </div>
              <div className="w-px h-12 bg-[#3d5afe]/30"></div>
              <div className="flex flex-col items-center">
                <p className="text-3xl text-[#3d5afe] font-semibold">3min</p>
                <p className="text-xs text-[#a1a6b0] uppercase tracking-wide mt-1">CREATION TIME</p>
              </div>
              <div className="w-px h-12 bg-[#3d5afe]/30"></div>
              <div className="flex flex-col items-center">
                <p className="text-3xl text-[#3d5afe] font-semibold">100%</p>
                <p className="text-xs text-[#a1a6b0] uppercase tracking-wide mt-1">PERSONALIZED</p>
              </div>
            </div>
          </div>
        </div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {USER_PROGRAMS.map((program) => (
            <Card
              key={program.id}
              className="bg-gradient-to-tr from-[#0f1115]/70 to-[#1a1f29]/70 backdrop-blur-md border border-[#3d5afe]/20 rounded-2xl hover:scale-105 hover:shadow-[0_0_20px_rgba(58,123,255,0.4)] transition-transform duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#3d5afe]/20">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3d5afe] animate-pulse"></div>
                  <span className="text-sm text-[#3d5afe] font-medium">USER.{program.id}</span>
                </div>
                <div className="text-xs text-[#a1a6b0]">{program.fitness_level.toUpperCase()}</div>
              </div>

              <CardHeader className="pt-6 px-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden border border-[#3d5afe]/20">
                    <img
                      src={program.profilePic}
                      alt={`${program.first_name}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {program.first_name}
                      <span className="text-[#3d5afe]">.exe</span>
                    </CardTitle>
                    <div className="text-xs text-[#a1a6b0] flex items-center gap-2 mt-1">
                      <Users className="h-4 w-4" />
                      {program.age}y • {program.workout_days}d/week
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div className="px-3 py-1 bg-[#3d5afe]/10 rounded-lg border border-[#3d5afe]/30 text-xs text-[#3d5afe] flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    {program.fitness_goal}
                  </div>
                  <div className="text-xs text-[#a1a6b0] flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    v3.5
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-5">
                <div className="space-y-4 pt-2">
                  {[
                    { icon: Dumbbell, title: program.workout_plan.title, desc: program.equipment_access, color: 'primary' },
                    { icon: AppleIcon, title: program.diet_plan.title, desc: 'System optimized nutrition', color: 'secondary' },
                    { icon: ShieldIcon, title: 'AI Safety Protocols', desc: 'Protection systems enabled', color: 'primary' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`p-2 rounded-md bg-${item.color}/10 text-${item.color} mt-0.5`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{item.title}</h3>
                        <p className="text-xs text-[#a1a6b0] mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-[#3d5afe]/20">
                  <p className="text-xs text-[#a1a6b0]">
                    <span className="text-[#3d5afe]">&gt; </span>
                    {program.workout_plan.description.substring(0, 120)}...
                  </p>
                </div>
              </CardContent>

              <CardFooter className="px-5 py-4 border-t border-[#3d5afe]/20">
                <Link href={`/programs/${program.id}`} className="w-full">
                  <Button className="w-full bg-[#3d5afe] text-white hover:bg-[#3d5afe]/90 transition-colors">
                    View Program Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link href="/generate-program">
            <Button
              size="lg"
              className="bg-[#3d5afe] text-white hover:bg-[#3d5afe]/90 px-8 py-6 text-lg transition-all"
            >
              Generate Your Program
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-[#a1a6b0] mt-4">
            Join 500+ users with AI-customized fitness programs
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPrograms;
