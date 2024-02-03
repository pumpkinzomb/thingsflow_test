import { Stack, styled, Box as MuiBox, Link } from "@mui/material";
import IssueItem from "./IssueItem";
import { IssueItemType } from "../types";

const Box = styled(MuiBox)(
  () => `
    &.issue-list-wrapper {
      width: 800px;
      margin: auto;
      @media (max-width: 600px) {
        width: 100%;
      }
    }
    
  `
);

type IssueListProps = {
  list: IssueItemType[];
};

const IssueList = (props: IssueListProps) => {
  const { list } = props;
  return (
    <Box className="issue-list-wrapper">
      {list.map((item, index) => {
        return (
          <>
            <IssueItem {...item} key={index} />
            {index + 1 > 9 && (index + 1) % 10 === 0 && (
              <Stack flexDirection={"row"} justifyContent={"center"}>
                <Link
                  href={"https://thingsflow.com/ko/home"}
                  target="_blank"
                ></Link>
                <img src="https://hellobot-test.s3.ap-northeast-2.amazonaws.com/image/01fdd797-0477-4717-8d70-8551150463f7" />
              </Stack>
            )}
          </>
        );
      })}
    </Box>
  );
};

export default IssueList;
