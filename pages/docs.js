import { GetStaticProps, InferGetStaticPropsType } from "next";

// import { createSwaggerSpec } from "next-swagger-doc";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { join } from "path";
import swaggerJsdoc from "swagger-jsdoc";
export function createSwaggerSpec({
  openApiVersion = "3.0.0",
  apiFolder = "pages/api",
  title,
  version,
}) {
  const apiDirectory = join(process.cwd(), apiFolder);
  const buildApiDirectory = join(process.cwd(), ".next/server", apiFolder);

  const options = {
    definition: {
      openapi: openApiVersion,
      info: {
        title,
        version,
      },
    },
    apis: [
      `${apiDirectory}/about.js`,
      `${apiDirectory}/car/*.js`,
      `${apiDirectory}/car/bike/*.js`,

      `${apiDirectory}/*.ts`,
      `${buildApiDirectory}/*.js`,
    ], // files containing annotations as above
  };

  return swaggerJsdoc(options);
}

const ApiDoc = ({ spec }) => {
  return <SwaggerUI spec={spec} />;
};

export const getStaticProps = async (ctx) => {
  const spec = createSwaggerSpec({
    title: "NextJS Swagger",
    version: "0.1.0",
  });
  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
