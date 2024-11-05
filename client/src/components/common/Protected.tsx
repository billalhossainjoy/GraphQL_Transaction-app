interface Props {
  children: React.ReactNode;
  auth: boolean;
}

const Protected: React.FC<Props> = ({ children, auth }) => {
  return <>{children}</>;
};
export default Protected;
