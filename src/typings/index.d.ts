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

/**
 * Special Types, Responses
 */
declare interface PollWithVotes extends PollModel {
  votes: number;
}

declare interface PollList {
  going: PollWithVotes[];
  soon: PollWithVotes[];
  finished: PollWithVotes[];
}

declare interface PollOptionWithVotes extends PollOptionModel {
  votes: number;
}

declare interface PollWithOptionsAndVotes extends PollModel {
  votes: number;
  options: PollOptionWithVotes[];
}

declare interface EditOptions {
  remove: number[];
  add: string[];
  edit: {
    id: number;
    value: string;
  }[];
}
