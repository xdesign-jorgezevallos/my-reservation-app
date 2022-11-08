import React from "react";
import TemplateBase from "../../components/commons/TemplateBase/TemplateBase";

export const AboutPage: React.FC = () => {
  return (
    <TemplateBase>
      <div>
        <h1 data-testid="title-page">About Page</h1>
        <p>some text to test</p>
      </div>
    </TemplateBase>
  );
};
