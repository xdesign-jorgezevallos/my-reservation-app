import React from "react";

import TemplateBase from "../../components/commons/TemplateBase/TemplateBase";

export const HomePage: React.FC = () => {
  return (
    <TemplateBase>
      <div>
        <h1 data-testid="title-page">Welcome Home</h1>
        <p>some text to test</p>
      </div>
      <br />
    </TemplateBase>
  );
};
