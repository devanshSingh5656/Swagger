import React from "react";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { join } from "path";

// import { join } from '';
function createSwaggerSpec({
  openApiVersion = "3.0.0",
  title,
  version,
  apiFolder = "pages/api",
}) {
  const apiDirectory = join(process.cwd(), apiFolder);
  const directy = join(__dirname, apiFolder);
  const options = {
    definition: {
      openapi: openApiVersion,
      info: {
        title,
        version,
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server",
        },
        {
          url: "https://go-regi.com",
          description: "Production server",
        },
      ],
    },

    apis: [`${apiDirectory}/about.js`], // files containing annotations as above
  };

  return swaggerJSDoc(options);
}

const Doc = ({ spec, classes }) => {
  return (
    <>
      <div>
        <div /* className={classes.container} */>
          <SwaggerUI spec={spec} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const spec = createSwaggerSpec({
    title: "Go-regi.com API",
    version: "3.0.0",
  });
  return {
    props: {
      spec,
    },
  };
};

export default Doc;
