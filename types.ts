
export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; // base64 data URL
  citations?: Citation[];
}

export interface Citation {
  uri: string;
  title: string;
}
