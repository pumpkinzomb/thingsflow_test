import {
  Button as MuiButton,
  buttonClasses,
  Stack as MuiStack,
  styled,
} from "@mui/material";

const Stack = styled(MuiStack)(
  () => `
    height: 70px;
    padding: 1rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    background: white;
    box-sizing: border-box;
    border-top: 1px solid grey;
`
);

const Button = styled(MuiButton)(
  () => `
      &.${buttonClasses.root} {
          text-transform: capitalize;
          font-size: 16px;
      }
  `
);

type ActionBarProps = {
  onLoad: () => void;
  onReset: () => void;
};

const ActionBar = (props: ActionBarProps) => {
  const { onLoad, onReset } = props;
  return (
    <Stack flexDirection={"row"} justifyContent={"space-between"}>
      <Button variant="contained" onClick={() => onLoad()}>
        load
      </Button>
      <Button variant="outlined" onClick={() => onReset()}>
        초기화
      </Button>
    </Stack>
  );
};

export default ActionBar;
