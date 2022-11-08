import React from "react";

import { Footer } from "../Footer";
import NavBarMenu from "../NavBarMenu/NavBarMenu";

const styles = {
  root: { height: "100%" },
  content: { minHeight: "72vh", backgroundColor: "yelow", padding: "5rem 0 " },
};

const TemplateBase: React.FC<any> = ({ children }) => {

  return (
    <div style={styles.root}>
      <NavBarMenu />
      <div style={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateBase;
