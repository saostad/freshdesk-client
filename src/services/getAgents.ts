import { writeLog } from "fast-node-logger";
import { validateOrFail } from "../helpers/util";
import { Agent, AgentsSchema } from "../typings/agent";
import { getData } from "../helpers/getData";
import { BaseGetInput } from "../typings/general";

export async function getAgents({ baseUri, token, doValidate }: BaseGetInput) {
  writeLog(`getAgent()`, { level: "debug" });

  const uri = `${baseUri}/api/v2/agents`;

  const data = await getData<Agent[]>({ uri, token });

  const agents: Agent[] = [];
  data.forEach((el) => {
    agents.push(...el["agents"]);
  });

  if (doValidate) {
    validateOrFail({ data: agents, schema: AgentsSchema });
  }

  writeLog(`${agents.length} agents downloaded.`, {
    stdout: true,
    level: "info",
  });

  return agents;
}
