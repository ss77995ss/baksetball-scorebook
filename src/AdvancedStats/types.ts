export type StatType = {
  statInfo: {
    type: string;
    name: string;
    isSwipeable: boolean;
    title:
      | {
          points: string;
          count: string;
        }
      | string;
  };
  q1:
    | {
        count: number;
        points: number;
      }
    | number;
  q2:
    | {
        count: number;
        points: number;
      }
    | number;
  q3:
    | {
        count: number;
        points: number;
      }
    | number;
  q4:
    | {
        count: number;
        points: number;
      }
    | number;
  total:
    | {
        count: number;
        points: number;
      }
    | number;
};
