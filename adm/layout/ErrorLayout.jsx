import React from "react";
import { Container } from "atoms";

function ErrorLayout(props) {
  const { children } = props;
  return (
    <Container fluid className="page-error bg-gradient-primary">
      {children}
    </Container>
  );
}

export default ErrorLayout;
