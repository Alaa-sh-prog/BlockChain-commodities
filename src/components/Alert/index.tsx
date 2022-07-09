import { Alert } from "react-bootstrap-v5";

type AlertType = {
  variant:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  text: string;
};

function CustomAlert({ variant, text }: AlertType) {
  return (
    <Alert key={variant} variant={variant}>
      {text}
    </Alert>
  );
}

export default CustomAlert;
