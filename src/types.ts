export type IssueItemType = {
  number: number;
  title: string;
  created_at: string;
  comments: number;
  creator: string;
};

export type GitIssueListResponseType = {
  number: number;
  title: string;
  created_at: string;
  comments: number;
  user: {
    login: string;
    avatar_url: string;
  };
  body: string;
};
