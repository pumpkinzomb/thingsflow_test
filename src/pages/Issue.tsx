import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box as MuiBox, Avatar, Stack, styled } from "@mui/material";
import { octokit } from "../utils/octokit";
import Header from "../components/Header";
import IssueItem from "../components/IssueItem";
import { IssueItemType } from "../types";

const Box = styled(MuiBox)(
  () => `
      &.issue-item-wrapper {
        width: 800px;
        margin: auto;
        padding-bottom: 140px;
        @media (max-width: 600px) {
          width: 100%;
        }

        pre {
            white-space: pre-line;
        }
      }
    `
);

const ORG = "angular";
const REPO = "angular-cli";

type IssueProps = {
  onOpenSnackbar: (message: string) => void;
  onCloseSnackbar: (
    _event: React.SyntheticEvent | Event,
    _reason?: string
  ) => void;
};

type IssueItemExtendsType = IssueItemType & {
  creator_avatar: string;
  body: string;
};

const Issue = (props: IssueProps) => {
  const { onOpenSnackbar } = props;
  const { issue_number } = useParams();
  const [issue, setIssue] = useState<IssueItemExtendsType | null>(null);

  useEffect(() => {
    if (issue_number) {
      getAnIssue(issue_number);
    }
  }, [issue_number]);

  const getAnIssue = async (issueNumber: string) => {
    try {
      const { data } = await octokit.request(
        `GET /repos/${ORG}/${REPO}/issues/${issueNumber}`,
        {
          owner: "OWNER",
          repo: "REPO",
          issue_number: `${issueNumber}`,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
      if (data) {
        const { number, title, created_at, comments, user, body } = data;
        setIssue({
          number,
          title,
          created_at,
          comments,
          creator: user.login,
          creator_avatar: user.avatar_url,
          body,
        });
      }
    } catch (error: any & { status: number }) {
      onOpenSnackbar(`server error: ${error.status}`);
    }
  };
  return (
    <Box>
      <Header repoName={REPO} orgName={ORG} />
      {issue && (
        <Box className="issue-item-wrapper">
          <Stack flexDirection={"row"} alignItems={"center"}>
            <Avatar src={`${issue.creator_avatar}`} />
            <IssueItem {...issue} noLink={true} />
          </Stack>
          <pre>{issue.body}</pre>
        </Box>
      )}
    </Box>
  );
};

export default Issue;
