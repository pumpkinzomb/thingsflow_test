import { useEffect, useState, useRef } from "react";
import { IssueItemType, GitIssueListResponseType } from "../types";
import { Box } from "@mui/material";
import Header from "../components/Header";
import IssueList from "../components/IssueList";
import ActionBar from "../components/ActionBar";
import Loading from "../components/Loading";
import { octokit } from "../utils/octokit";

const ORG = "angular";
const REPO = "angular-cli";

type ListProps = {
  onOpenSnackbar: (message: string) => void;
  onCloseSnackbar: (
    _event: React.SyntheticEvent | Event,
    _reason?: string
  ) => void;
};

const List = (props: ListProps) => {
  const { onOpenSnackbar } = props;
  const scrollRef = useRef<HTMLDivElement>();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [issueList, setIssueList] = useState<IssueItemType[]>([]);

  useEffect(() => {
    getIssueList();
  }, [page]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "end",
    });
  }, [issueList, scrollRef.current]);

  const handleReset = () => {
    setIssueList([]);
    setPage(1);
  };

  const handleLoad = () => {
    setPage(page + 1);
  };

  const getIssueList = async () => {
    setLoading(true);
    try {
      const { data } = await octokit.request(
        `GET /repos/${ORG}/${REPO}/issues?per_page=10&sort=comments&page=${page}`,
        {
          owner: "OWNER",
          repo: "REPO",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
      if (data) {
        const newList = data.map((item: GitIssueListResponseType) => {
          const { number, title, created_at, comments, user } = item;
          return {
            number,
            title,
            created_at,
            comments,
            creator: user.login,
          };
        });
        setIssueList(issueList.concat(newList));
      }
    } catch (error: any & { status: number }) {
      onOpenSnackbar(error.status);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="App" sx={{ paddingBottom: "200px" }} ref={scrollRef}>
      {loading && <Loading message="issue 10개 로딩 시작" />}
      <Header repoName={REPO} orgName={ORG} />
      <IssueList list={issueList} />
      <ActionBar onLoad={handleLoad} onReset={handleReset} />
    </Box>
  );
};

export default List;
