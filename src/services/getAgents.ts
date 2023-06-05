import { writeLog } from "fast-node-logger";
import { z } from "zod";
import { validateOrFail } from "../helpers/util";
import { Agent, Agents } from "../typings/agent";
import { getData } from "./getData";

type GetAgent = { baseUri: string; token: string };
export async function getAgents({ baseUri, token }: GetAgent) {
  writeLog(`getAgent()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/agents`;

  const data = await getData<z.infer<typeof Agent>>({ uri, token });

  const agents: z.infer<typeof Agent>[] = [];
  data.forEach((el) => {
    agents.push(...el["agents"]);
  });

  validateOrFail({ data: agents, schema: Agents });

  writeLog(`${agents.length} agents downloaded.`, {
    stdout: true,
    level: "info",
  });

  return agents;
}
