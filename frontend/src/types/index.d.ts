declare module '../types' {
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
} 