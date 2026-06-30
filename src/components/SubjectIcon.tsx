import {
  Activity,
  Baby,
  Bone,
  Bug,
  FlaskConical,
  Heart,
  Microscope,
  Pill,
  Scale,
  Scissors,
  Stethoscope,
  Users,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  bone: Bone,
  activity: Activity,
  flask: FlaskConical,
  microscope: Microscope,
  pill: Pill,
  bug: Bug,
  users: Users,
  scale: Scale,
  stethoscope: Stethoscope,
  scissors: Scissors,
  baby: Baby,
  heart: Heart,
};

export function SubjectIcon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  const Icon = (name && MAP[name]) || BookOpen;
  return <Icon className={className} strokeWidth={1.6} />;
}
