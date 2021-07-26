type Socket = import("socket.io").Socket;

interface User {
  username: string;
  password: string;
}

export interface AudioViewModel {
  error: string;
  inRoom: boolean;
  socketActive: boolean;
  calling: boolean;
  showSheet: boolean;
  minimized: boolean;
  callToUsername: string;
  roomID: string;
  remoteList: ToURLOrRemoteList;
  roomList?: null[] | null;
  localStream: LocalStream;
}
export interface ToURLOrRemoteList {}
export interface LocalStream {
  toURL: ToURLOrRemoteList;
}

interface OnChatData {
  messageBody: string;
}

interface OnMuteData {
  muted: boolean;
}

interface Message extends OnChatData {
  userImage: string;
  username: string;
  createdAt: string;
}

interface ConnectionData {
  firstName: string;
  lastName: string;
  username: string;
  userImage: string;
}

interface Participant extends ConnectionData {
  muted: boolean;
  socketID?: string;
}

type participants = { [key: string]: Participant };

interface CreateRoom {
  roomName: string;
  roomImage: string;
  creator: string;
  category: string;
  description: string;
  conversationType: string;
  allowed: string[];
  permanent: boolean;
  secret: string;
  tags: string[];
  private: boolean;
  silence: boolean;
  pin: string;
}

interface Room extends CreateRoom {
  roomID: number;
  createdAt: string;
  token: string;
  banned: string[];
  moderators: string[];
  silenced: string[];
  participants: participants;
}
