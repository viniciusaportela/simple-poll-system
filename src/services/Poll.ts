import axios from "axios";

import { API_SERVER } from "../constants";
import treatCatch from "../utils/treatCatch";

export default class PollService {
  static async get(pollId: number) {
    try {
      const res = await axios.get(`${API_SERVER}/v1/polls/`, {
        data: pollId ? { pollId } : undefined,
      });

      return {
        status: "success",
        data: res.data,
      };
    } catch (e) {
      treatCatch(e);
    }
  }

  static async create({
    title,
    dateStart,
    dateEnd,
    options,
  }: {
    title: string;
    dateStart: string;
    dateEnd: string;
    options: string[];
  }): Promise<ApiResponse | void> {
    try {
      const res = await axios.post(`${API_SERVER}/v1/polls/`, {
        title,
        date_start: dateStart,
        date_end: dateEnd,
        options,
      });

      return {
        status: "success",
        data: res.data,
      };
    } catch (e) {
      treatCatch(e);
    }
  }
}
