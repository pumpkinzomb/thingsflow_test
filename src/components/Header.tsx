import {
  Stack,
  Typography as MuiTypography,
  typographyClasses,
  styled,
} from "@mui/material";

const Typography = styled(MuiTypography)(
  () => `
    &.${typographyClasses.h1} {
        text-transform: capitalize;
        font-size: 24px;
    }
`
);

type HeaderProps = {
  orgName: string;
  repoName: string;
};

const Header = (props: HeaderProps) => {
  const { orgName, repoName } = props;
  return (
    <Stack flexDirection={"row"} justifyContent={"center"} sx={{ padding: 2 }}>
      <Typography variant="h1">{`${orgName} / ${repoName}`}</Typography>
    </Stack>
  );
};

export default Header;
