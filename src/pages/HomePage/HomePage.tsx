import React from 'react';
import TemplateBase from '../../components/commons/TemplateBase/TemplateBase';

export const HomePage: React.FC = () => {
  return (
    <TemplateBase>
      <div data-testid="home-page">
        <h1 data-testid="title-page">Welcome Home</h1>
        <p>This is home content</p>
      </div>
      <br />
    </TemplateBase>
  );
};
