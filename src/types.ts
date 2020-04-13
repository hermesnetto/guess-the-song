export interface OptionSelector {
  id: string;
  title: string;
  selected: boolean;
}

export interface Track {
  id: string;
  artists: {
    name: string;
  }[];
  name: string;
}
