import React from "react";
import { withAuthorization } from "../../common/config/HOC/withAuth";

interface ICartPageProps {}

const Cart: React.FC<ICartPageProps> = (props) => {
  return <p>Hello</p>;
};

export default withAuthorization(Cart);
