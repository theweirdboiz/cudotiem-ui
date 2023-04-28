import React from "react";
import { ModalAdvanced, ModalBase, SignUpModal } from "~/components";

type Props = {};

const SignUpPage = (props: Props) => {
  return (
    <ModalAdvanced visible={true} heading="Welcome back, mate">
      <SignUpModal />
    </ModalAdvanced>
  );
};

export default SignUpPage;
