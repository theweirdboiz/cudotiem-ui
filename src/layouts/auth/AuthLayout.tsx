import { ReactNode } from "react";
import PageWrapper from "../components/wrapper/PageWrapper";

type Props = {
  children: ReactNode;
};

const AuthLayout = (props: Props) => {
  const { children } = props;
  return (
    <PageWrapper>
      <div className="flex items-center justify-center">{children}</div>
    </PageWrapper>
  );
};

export default AuthLayout;
