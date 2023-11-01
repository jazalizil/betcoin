export type State = Record<string, any>;

export type Action<H = any> = {
  type: keyof H;
  data: H[keyof H];
};
