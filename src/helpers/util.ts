import { createLogger, Logger, writeLog } from "fast-node-logger";
import path from "path";
import { NodeMode } from "../typings/node/mode";
import keytar from "keytar";
import { AxiosResponse } from "axios";

type Credential = {
  account: string;
  password: string;
};

export async function getCredential(targetName: string): Promise<Credential> {
  writeLog([`getCredential`, targetName], { level: "trace" });

  const [myCred] = await keytar.findCredentials(targetName);
  return {
    ...myCred,
    // eslint-disable-next-line no-control-regex
    password: myCred.password.replace(/[\x00-\x08\x0E-\x1F\x7F-\uFFFF]/g, ""),
  };
}

/**@description logger instance to store logs in files located in ./logs directory */
export async function createLoggerInstance(
  nodeMode: NodeMode,
): Promise<Logger> {
  writeLog([`createLoggerInstance`, nodeMode], { level: "trace" });

  /** ready to use instance of logger */
  const logger = await createLogger({
    level: nodeMode === "development" ? "trace" : "info",
    logDir: path.join(process.cwd(), "logs"),
    retentionTime: nodeMode === "development" ? 360000 : undefined,
  });
  logger.info(`script started in ${nodeMode} mode!`);
  return logger;
}

/**@description load specific process.env variable or fail */
export function env(name: string): string {
  writeLog([`env`, name], { level: "trace" });

  const data = process.env[name];
  if (data) {
    return data;
  } else {
    throw new Error(`environment variable ${name} is not available!`);
  }
}

type ValidateOrFail = { data: any; schema: any };

/**@description validate data against zod schema
 * @throws {Error} if validation failed
 */
export function validateOrFail({ data, schema }: ValidateOrFail) {
  writeLog([`validateOrFail`], { level: "trace" });

  const result = schema.safeParse(data);
  if (!result.success) {
    // handle error then return
    throw new Error(JSON.stringify(result.error.issues, null, 2));
  } else {
    return result.data;
  }
}

export function isMoreDataAvailable(apiResponse: AxiosResponse<any, any>) {
  writeLog([`isMoreDataAvailable`, apiResponse], { level: "trace" });

  try {
    if (apiResponse.headers?.link?.search('rel="next"')) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    writeLog([`error while validating if more data is available.`, error], {
      stdout: true,
      level: "error",
    });
    throw new Error(error);
  }
}

export function getNexLink(headers: AxiosResponse["headers"]) {
  writeLog([`getNexLink`, headers], { level: "trace" });

  if (headers.link) {
    const start = 1 + headers.link.search("<");
    const end = headers.link.search(">");
    const linkStr = headers.link.substring(start, end);
    return linkStr;
  }
  throw "no next link";
}

export function stringifyANumber(
  input?: number | null | string,
): string | null {
  writeLog([`stringifyANumber`, input], { level: "trace" });

  if (input === null || input === undefined) {
    return null;
  } else {
    return String(input);
  }
}
