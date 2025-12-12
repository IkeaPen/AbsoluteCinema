import fs from "fs";
import yaml from "js-yaml";
import { swaggerSpec } from "../config/swagger";

const yamlData = yaml.dump(swaggerSpec);

fs.writeFileSync("api-spec.yaml", yamlData);

console.log("api-spec.yaml generated successfully!");
