import { Member } from "./user";

export interface MeFollowed {
  follow_id: string;
  subscriber_id: string;
  me_following: boolean;
}

export interface Follower {
  _id: string;
  follow_id: string;
  subscriber_id: string;
  createdAt: Date;
  updatedAt: Date;
  subscriber_member_data: Member;
  me_followed?: MeFollowed[];
}

export interface Following {
  _id: string;
  follow_id: string;
  subscriber_id: string;
  createdAt: Date;
  updatedAt: Date;
  follow_member_data: Member;
}
