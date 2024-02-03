import {
  Stack as MuiStack,
  Typography as MuiTypography,
  typographyClasses,
  styled,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { IssueItemType } from "../types";

const Stack = styled(MuiStack)(
  () => `
    
    .issue-item-comment {
        width: 80px;
        flex-shrink:0;
    }
`
);

const Typography = styled(MuiTypography)(
  () => `
      &.${typographyClasses.subtitle1} {
          font-size: 16px;
          line-height: 20px;
      }
  `
);

type IssueItemProps = IssueItemType & {
  noLink?: boolean;
};

const IssueItem = (props: IssueItemProps) => {
  const { number, title, comments, created_at, creator, noLink } = props;
  return (
    <Stack
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignContent={"center"}
      gap={2}
      sx={{ padding: 2 }}
    >
      <Box className="issue-content">
        {noLink ? (
          <Typography variant="subtitle1">{`#${number} ${title}`}</Typography>
        ) : (
          <Link to={`/${number}`}>
            <Typography variant="subtitle1">{`#${number} ${title}`}</Typography>
          </Link>
        )}
        <Typography variant="body1">{`작성자: ${creator}, 작성일: ${format(
          new Date(created_at),
          "yyyy.MM.dd"
        )}`}</Typography>
      </Box>
      <Typography
        variant="body1"
        className="issue-item-comment"
      >{`코멘트: ${comments}`}</Typography>
    </Stack>
  );
};

export default IssueItem;
