import axios from "axios";
import { AlertQuery } from "../types/AlertQueryType";
import { Alert } from "../types/AlertType";

const { REACT_APP_API_BASE_URL } = process.env;

type GetAlertArgs = {
  searchTerm?: string;
  params?: AlertQuery;
};

axios.defaults.baseURL = REACT_APP_API_BASE_URL;

const getAlerts = async ({
  searchTerm,
  params,
}: GetAlertArgs): Promise<({ alerts: Alert[] } & { count: number }) | void> => {
  if (!searchTerm) {
    const {
      data: { alerts, count },
    } = await axios.get("/alerts", {
      params,
    });

    return { alerts, count };
  }

  const [
    {
      data: { alerts: byDescriptionAlerts, count: byDescriptionCount },
    },
    {
      data: { alerts: byServerAlerts, count: byServerCount },
    },
  ] = await Promise.all([
    axios.get("/alerts", {
      params: { ...params, description: searchTerm },
    }),
    axios.get("/alerts", {
      params: { ...params, server: searchTerm },
    }),
  ]);

  return {
    alerts: byDescriptionAlerts.concat(byServerAlerts),
    count: byDescriptionCount + byServerCount,
  };
};

export { getAlerts };
