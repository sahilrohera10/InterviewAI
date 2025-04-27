import { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface TestimonialProps {
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface DifferentiatorProps {
  title: string;
  description: string;
}

export interface FAQItemProps {
  question: string;
  answer: string;
}

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface TechStack {
  id: string;
  name: string;
  category: string;
}

export interface InterviewSetup {
  domain: string;
  role: string;
  experience: number;
  techStack: string[];
  duration: number;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  type: 'behavioral' | 'technical';
  followUp?: string[];
}

export interface InterviewResponse {
  id: string;
  questionId: string;
  response: string;
  analysis: {
    clarity: number;
    relevance: number;
    structure: number;
    technicalAccuracy?: number;
  };
}

export interface InterviewSession {
  id: string;
  date: string;
  duration: number;
  role: string;
  score: number;
  questions: {
    id: string;
    question: string;
    type: string;
  }[];
  responses: {
    id: string;
    questionId: string;
    response: string;
    analysis: {
      clarity: number;
      relevance: number;
      structure: number;
      technicalAccuracy?: number;
    };
  }[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface InterviewAnalytics {
  interviewId: string;
  overall_performance: string;
  general_score: number;
  technical_accuracy: number;
  communication: number;
  strengths: string[];
  areas_to_improve: string[];
  closing_remark: string;
}

export interface AnalyticsResponse {
  status: string;
  message: string;
  data: InterviewAnalytics;
}

export interface DashboardStats {
  totalInterviews: number;
  averageScore: number;
  completedInterviews: number;
  upcomingInterviews: number;
}