import axios from "axios";

import { API_SERVER } from "../constants";
import treatCatch from "../utils/treatCatch";
import formatDateToDatabaseDate from "../utils/formatDateToDatabaseDate";

export default class PollService {
  /**
   * Get data from one Specific Poll
   */
  static async get(pollId: number) {
    try {
      const res = await axios.get(`${API_SERVER}/v1/polls/`, {
        params: { ...(pollId && { pollId }) },
      });

      return res.data;
    } catch (e) {
      treatCatch(e);
    }
  }

  /**
   * Get a list of polls separated by
   *
   * - going - current available polls
   * - finished - finished polls
   * - soon - polls that are going to happen in future
   */
  static async getAll() {
    try {
      const res = await axios.get(`${API_SERVER}/v1/polls/`);

      return res.data;
    } catch (e) {
      treatCatch(e);
    }
  }

  /**
   * Creates a Poll
   */
  static async create({
    title,
    dateStart,
    dateEnd,
    options,
  }: {
    title: string;
    dateStart: Date;
    dateEnd: Date;
    options: string[];
  }) {
    try {
      const res = await axios.post(`${API_SERVER}/v1/polls/`, {
        title,
        date_start: formatDateToDatabaseDate(dateStart),
        date_end: formatDateToDatabaseDate(dateEnd),
        options,
      });

      return res.data;
    } catch (e) {
      treatCatch(e);
    }
  }

  /**
   * Edit a specific Poll with new data
   *
   * @param pollId PollId
   * @param param1 New Data
   */
  static async edit(
    pollId: number,
    {
      title,
      dateStart,
      dateEnd,
      options,
    }: {
      title: string;
      dateStart: Date;
      dateEnd: Date;
      options: EditOptions;
    }
  ) {
    try {
      await axios.put(`${API_SERVER}/v1/polls/`, {
        poll_id: pollId,
        title,
        date_start: formatDateToDatabaseDate(dateStart),
        date_end: formatDateToDatabaseDate(dateEnd),
        options,
      });
    } catch (e) {
      treatCatch(e);
    }
  }

  /**
   * Delete one specific poll
   *
   * @param pollId
   */
  static async delete(pollId: any) {
    try {
      await axios({
        method: "DELETE",
        data: { poll_id: parseInt(pollId) },
        url: `${API_SERVER}/v1/polls/`,
      });
    } catch (e) {
      treatCatch(e);
    }
  }
}
