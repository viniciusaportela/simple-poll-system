type StatusOrErrorCode = string | number;

/**
 * Database Models
 */
declare interface PollModel {
  id: number;
  title: string;
  date_start: string;
  date_end: string;
  options?: PollOptionModel[];
}

declare interface PollOptionModel {
  id: number;
  value: string;
  poll_id: number;
}

declare interface PollVoteModel {
  id: number;
  poll_option_id: string;
}
