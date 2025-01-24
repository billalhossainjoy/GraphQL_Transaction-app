interface Props {
  children: React.ReactNode;
  auth: boolean;
}

const Protected: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};
export default Protected;
