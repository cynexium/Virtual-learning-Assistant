export interface Solution {
  id: string;
  image: string;
  solution: string;
  timestamp: Date;
}

export interface Settings {
  apiKey: string;
  voiceEnabled: boolean;
}