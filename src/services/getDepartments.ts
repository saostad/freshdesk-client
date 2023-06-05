import { writeLog } from "fast-node-logger";
import { z } from "zod";
import { validateOrFail } from "../helpers/util";
import { Department, Departments } from "../typings/departments";
import { getData } from "./getData";

type GetDepartments = { baseUri: string; token: string };
export async function getDepartments({ baseUri, token }: GetDepartments) {
  writeLog(`getDepartments()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/departments`;

  const data = await getData<z.infer<typeof Department>>({ uri, token });

  const departments: z.infer<typeof Department>[] = [];
  data.forEach((el) => {
    departments.push(...el["departments"]);
  });

  validateOrFail({ data: departments, schema: Departments });

  writeLog(`${departments.length} departments downloaded.`, {
    stdout: true,
    level: "info",
  });

  return departments;
}
